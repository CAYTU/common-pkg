import { JSONCodec, NatsConnection } from "nats";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: unknown;
}

const codec = JSONCodec();

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  private nc: NatsConnection;

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  async publish(data: T["data"]): Promise<void> {
    const js = this.nc.jetstream();
    await js.publish(this.subject, codec.encode(data));
  }
}
