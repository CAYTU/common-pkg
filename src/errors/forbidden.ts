import { CustomErr } from "./custom";

export class ForbiddenErr extends CustomErr {
  statusCode = 403;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ForbiddenErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
