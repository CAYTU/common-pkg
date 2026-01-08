import { NatsConnection } from "@nats-io/nats-core";
import { Consumer, JetStreamClient, JsMsg } from "@nats-io/jetstream";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract consumerName: string; // replaces queueGroupName
  abstract streamName: string; // you'll need to define which stream to use
  abstract onMessage(data: T["data"], msg: JsMsg): void;

  private client: NatsConnection;
  private js: JetStreamClient;
  protected consumer?: Consumer;

  protected ackWait: number = 5 * 1000; // 5 seconds

  constructor(client: NatsConnection, js: JetStreamClient) {
    this.client = client;
    this.js = js;
  }

  /**
   * Creates or updates the consumer with appropriate configuration
   */
  async createConsumer() {
    // Note: You'll need to ensure the stream exists before creating the consumer
    // This is typically done during application initialization
    this.consumer = await this.js.consumers.get(
      this.streamName,
      this.consumerName,
    );
  }

  /**
   * Start listening for messages using the consume pattern (continuous message delivery)
   */
  async listen() {
    if (!this.consumer) {
      await this.createConsumer();
    }

    if (!this.consumer) {
      throw new Error("Consumer not initialized");
    }

    console.log(
      `Starting to consume messages: ${this.subject} / ${this.consumerName}`,
    );

    // Using consume() for continuous message delivery
    const messages = await this.consumer.consume({
      max_messages: 100, // buffer up to 100 messages
      expires: this.ackWait,
    });

    // Process messages as they arrive
    (async () => {
      try {
        for await (const msg of messages) {
          console.log(`Msg received: ${msg.subject} / ${this.consumerName}`);

          try {
            const parsedData = this.parseMessage(msg);
            await this.onMessage(parsedData, msg);
            // Message will be auto-acked if onMessage completes successfully
            msg.ack();
          } catch (error) {
            console.error(`Error processing message: ${error}`);
            // Negative acknowledgment - message will be redelivered
            msg.nak();
          }
        }
      } catch (error) {
        console.error(`Consumer error: ${error}`);
        // Handle consumer errors (e.g., consumer deleted, stream deleted)
      }
    })();
  }

  /**
   * Alternative: Fetch messages in batches (for more controlled consumption)
   */
  async fetchMessages(batchSize: number = 10) {
    if (!this.consumer) {
      await this.createConsumer();
    }

    if (!this.consumer) {
      throw new Error("Consumer not initialized");
    }

    const messages = await this.consumer.fetch({
      max_messages: batchSize,
      expires: this.ackWait,
    });

    for await (const msg of messages) {
      console.log(`Msg received: ${msg.subject} / ${this.consumerName}`);

      try {
        const parsedData = this.parseMessage(msg);
        await this.onMessage(parsedData, msg);
        msg.ack();
      } catch (error) {
        console.error(`Error processing message: ${error}`);
        msg.nak();
      }
    }
  }

  /**
   * Parse the message data
   */
  private parseMessage(msg: JsMsg): T["data"] {
    const data = msg.data;
    const text = new TextDecoder().decode(data);
    return JSON.parse(text);
  }

  /**
   * Stop consuming messages and clean up
   */
  async stop() {
    if (this.consumer) {
      console.log(`Stopping consumer: ${this.consumerName}`);
      // The consumer will stop when the iterator is broken
      // Additional cleanup can be done here if needed
    }
  }
}
