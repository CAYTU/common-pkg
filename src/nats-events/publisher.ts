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
    await this.publishNats(data);
    await this.publishWs(data);
  }

  private publishNats(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.natsClient.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  private publishWs(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.wsClient) {
        console.error("(WS) WebSocket client is not defined.");
        return reject(new Error("WebSocket client is not defined."));
      }

      this.wsClient.publish(this.subject, JSON.stringify(data), (err: any) => {
        if (err) {
          return reject(err);
        }

        console.log("(WS) Event published to subject", this.subject);
        resolve();
      });
    });
  }
}
