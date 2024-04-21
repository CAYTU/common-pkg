import { Subjects } from "../../nats-events/subjects";

export interface EmailLinkResendRequestEvent {
  subject: Subjects.EmailLinkResendRequest;
  data: {
    id: string;
    username: string;
    email: string;
  };
}
