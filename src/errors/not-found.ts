import { CustomErr } from "./custom";

export class NotFoundErr extends CustomErr {
  statusCode = 404;

  constructor(public msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, NotFoundErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg ?? "Not Found Error." }];
  }
}
