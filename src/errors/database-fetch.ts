import { CustomErr } from "./custom";

export class DatabaseFetchErr extends CustomErr {
  statusCode = 500;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, DatabaseFetchErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
