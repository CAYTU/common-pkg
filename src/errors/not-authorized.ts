import { CustomErr } from "./custom";

export class NotAuthorizedErr extends CustomErr {
  statusCode = 401;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotAuthorizedErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg ?? "Not Authorized." }];
  }
}
