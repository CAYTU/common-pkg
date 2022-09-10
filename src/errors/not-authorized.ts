import { CustomErr } from "./custom";

export class NotAuthorizedErr extends CustomErr {
  statusCode = 401;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthorizedErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authorized." }];
  }
}
