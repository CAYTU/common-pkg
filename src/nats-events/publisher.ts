import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  private natsClient: Stan;
  private wsClient: any; // Adjust the type based on your WebSocket client

  constructor(natsClient: Stan, wsClient?: any) {
    this.natsClient = natsClient;
    this.wsClient = wsClient;
  }

  async publish(data: T["data"]): Promise<void> {
    try {
      await this.publishNats(data);
      await this.publishWs(data);
    } catch (error) {
      console.error("Error publishing event:", error);
      throw error; // Re-throw the error to propagate it up the stack
    }
  }

  private publishNats(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.natsClient.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          console.error("Error publishing to NATS:", err);
          reject(err); // Reject the promise with the error
        } else {
          resolve();
        }
      });
    });
  }

  private publishWs(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.wsClient) {
        console.error("(WS) WebSocket client is not defined.");
        reject(new Error("WebSocket client is not defined."));
        return;
      }

      this.wsClient.publish(this.subject, JSON.stringify(data), (err: any) => {
        if (err) {
          console.error("Error publishing to WebSocket:", err);
          reject(err); // Reject the promise with the error
        } else {
          console.log("(WS) Event published to subject", this.subject);
          resolve();
        }
      });
    });
  }
}
