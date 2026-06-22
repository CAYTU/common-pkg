import {
  AckPolicy,
  DeliverPolicy,
  JsMsg,
  JSONCodec,
  NatsConnection,
} from "nats";
import { Subjects } from "./subjects";
import { EVENTS_STREAM_NAME } from "./setup";

interface Event {
  subject: Subjects;
  data: unknown;
}

const codec = JSONCodec();

export type Message = JsMsg;

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  private nc: NatsConnection;

  protected ackWait: number = 5 * 1000;

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  async listen(): Promise<void> {
    const js = this.nc.jetstream();
    const jsm = await this.nc.jetstreamManager();

    const durable = sanitiseDurableName(
      `${this.queueGroupName}--${this.subject}`,
    );

    try {
      await jsm.consumers.info(EVENTS_STREAM_NAME, durable);
    } catch {
      await jsm.consumers.add(EVENTS_STREAM_NAME, {
        durable_name: durable,
        deliver_policy: DeliverPolicy.All,
        ack_policy: AckPolicy.Explicit,
        ack_wait: this.ackWait * 1_000_000, // ms → ns
        filter_subject: this.subject,
        max_deliver: -1,
      });
    }

    const consumer = await js.consumers.get(EVENTS_STREAM_NAME, durable);
    const messages = await consumer.consume();

    (async () => {
      for await (const m of messages) {
        try {
          this.onMessage(this.parser(m), m);
        } catch (err) {
          // Don't ack on handler error — let JetStream redeliver up to max_deliver.
          console.error(
            `[Listener:${this.queueGroupName}] error on '${this.subject}':`,
            err,
          );
        }
      }
    })();
  }

  parser(msg: Message): T["data"] {
    return codec.decode(msg.data) as T["data"];
  }
}

// JetStream durable names must match /^[a-zA-Z0-9_-]+$/. Subjects use ':' as
// the delimiter, so we replace it with '-' and length-cap to 64 chars.
function sanitiseDurableName(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 64);
}
