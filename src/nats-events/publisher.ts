import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { StringCodec, NatsConnection } from "nats";

const sc = StringCodec();

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
   * Adjust the type based on your WebSocket client implementation.
   */
  private wsClient: NatsConnection;

  /**
   * Creates a new Publisher instance.
   * @param natsClient - The NATS Streaming client instance.
   * @param wsClient - (Optional) The WebSocket client instance for WebSocket communication.
   */
  constructor(natsClient: Stan, wsClient?: any) {
    this.natsClient = natsClient;
    this.wsClient = wsClient;
  }

  /**
   * Publishes the event data to the NATS channel.
   * @param data - The event data to be published.
   * @returns A Promise that resolves when the event is successfully published or rejects if there is an error.
   */
  async publishToNats(data: T["data"]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
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
  }

  /**
   * Publishes the event data to the WebSocket channel.
   * @param data - The event data to be published.
   * @returns A Promise that resolves when the event is successfully published or rejects if there is an error.
   */
  async publishToWs(data: T["data"]): Promise<void> {
    try {
      if (!this.wsClient) {
        console.error("(WS) WebSocket client is not defined.");
        return;
      }

      // Listen for WebSocket closure
      this.wsClient.closed().then(() => {
        console.log("WebSocket client is closed.");
      });

      // Publish the message
      this.wsClient.publish(this.subject, sc.encode(JSON.stringify(data)));

      console.log("(WS) Event published to subject", this.subject);

      // Flush and close the WebSocket connection
      await this.wsClient.flush();
      await this.wsClient.close();
    } catch (err) {
      console.error("Error during WebSocket operation:", err);
      // Depending on the nature of the error, you can choose to reject the promise or handle it accordingly.
      // If you want to reject the promise, you can rethrow the error like this:
      // throw err;
    }
  }
}
