import { CustomErr } from "./custom";

export class ServerErr extends CustomErr {
  statusCode = 500;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ServerErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
