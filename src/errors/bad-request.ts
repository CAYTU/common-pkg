import { CustomErr } from "./custom";

export class BadRequestErr extends CustomErr {
  statusCode = 400;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadRequestErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
