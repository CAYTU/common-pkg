import { CustomErr } from "./custom";

export class BadGatewayErr extends CustomErr {
  statusCode = 502;

  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadGatewayErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
