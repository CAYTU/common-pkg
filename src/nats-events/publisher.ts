import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { NatsConnection } from "nats";

/**
 * An interface that defines the structure of an event.
 */
interface Event {
  subject: Subjects;
  data: any;
}

/**
 * An abstract base class for publishing events to multiple communication channels.
 * @typeparam T - The event type that extends the Event interface.
 */
export abstract class Publisher<T extends Event> {
  /**
   * The subject of the event to be published.
   */
  abstract subject: T["subject"];

  /**
   * The NATS Streaming client used for publishing to NATS.
   */
  private natsClient: Stan;

  /**
   * The WebSocket client used for publishing to WebSocket.
   * This is optional and will only be used if provided.
   */
  private wsClient?: NatsConnection;

  /**
   * Creates a new Publisher instance.
   * @param natsClient - The NATS Streaming client instance.
   * @param wsClient - (Optional) The WebSocket client instance for WebSocket communication.
   */
  constructor(natsClient: Stan, wsClient?: NatsConnection) {
    this.natsClient = natsClient;
    this.wsClient = wsClient;
  }

  /**
   * Publishes the event data to the NATS and optionally to the WebSocket channel.
   * @param data - The event data to be published.
   * @returns A Promise that resolves when the event is successfully published or rejects if there is an error.
   */
  async publish(data: T["data"]): Promise<void> {
    // Publish to NATS
    await new Promise<void>((resolve, reject) => {
      this.natsClient.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          console.error("Error publishing to NATS:", err);
          reject(err);
        } else {
          console.log("(NATS) Event published to subject", this.subject);
          resolve();
        }
      });
    });

    // Publish to WebSocket if client is provided
    if (this.wsClient) {
      try {
        if (this.wsClient.isClosed()) {
          console.log("(WS) WebSocket is closed. Reconnecting...");
          // Add logic to handle reconnection if needed
        }

        // Publish the message
        this.wsClient.publish(this.subject, Buffer.from(JSON.stringify(data)));
        console.log("(WS) Event published to subject", this.subject);

        // Optionally, you can flush the message to ensure it's sent immediately
        await this.wsClient.flush();
      } catch (err) {
        console.error("Error during WebSocket operation:", err);
      }
    }
  }
}
