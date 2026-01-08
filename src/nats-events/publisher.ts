import { NatsConnection, headers } from "@nats-io/nats-core";
import { JetStreamClient, PubAck } from "@nats-io/jetstream";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

/**
 * An abstract base class for publishing events to JetStream.
 * @typeparam T - The event type that extends the Event interface.
 */
export abstract class Publisher<T extends Event> {
  /**
   * The subject of the event to be published.
   */
  abstract subject: T["subject"];

  /**
   * The NATS connection client.
   */
  private client: NatsConnection;

  /**
   * The JetStream client used for publishing to streams.
   */
  private js: JetStreamClient;

  /**
   * Creates a new Publisher instance.
   * @param client - The NATS connection instance.
   * @param js - The JetStream client instance.
   */
  constructor(client: NatsConnection, js: JetStreamClient) {
    this.client = client;
    this.js = js;
  }

  /**
   * Publishes the event data to JetStream.
   * @param data - The event data to be published.
   * @param options - Optional publish options
   * @returns A Promise that resolves to PubAck when the event is successfully published
   */
  async publish(
    data: T["data"],
    options?: {
      msgID?: string; // Unique message ID for deduplication
      headers?: Record<string, string>; // Custom headers
      timeout?: number; // Timeout for publish operation
    },
  ): Promise<PubAck> {
    try {
      const payload = JSON.stringify(data);
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(payload);

      // Create headers if needed
      let msgHeaders = undefined;

      if (options?.headers || options?.msgID) {
        msgHeaders = headers();

        // Add custom headers
        if (options.headers) {
          Object.entries(options.headers).forEach(([key, value]) => {
            msgHeaders!.append(key, value);
          });
        }

        // Add message ID for deduplication
        if (options.msgID) {
          msgHeaders.append("Nats-Msg-Id", options.msgID);
        }
      }

      // Publish to JetStream
      const pubAck = await this.js.publish(this.subject, encodedData, {
        headers: msgHeaders,
        timeout: options?.timeout,
      });

      console.log(
        `Event published to subject ${this.subject} - Stream: ${pubAck.stream}, Seq: ${pubAck.seq}`,
      );

      return pubAck;
    } catch (err) {
      console.error("Error publishing to JetStream:", err);
      throw err;
    }
  }

  /**
   * Publishes multiple messages in a batch
   * @param dataArray - Array of event data to publish
   * @returns Promise that resolves to array of PubAcks
   */
  async publishBatch(dataArray: T["data"][]): Promise<PubAck[]> {
    const publishPromises = dataArray.map((data) => this.publish(data));
    return Promise.all(publishPromises);
  }

  /**
   * Check if the client is connected
   */
  isConnected(): boolean {
    return !this.client.isClosed();
  }

  /**
   * Get connection info
   */
  getConnectionInfo() {
    return {
      connected: !this.client.isClosed(),
      server: this.client.info?.server_name,
    };
  }
}
