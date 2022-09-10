import { CustomErr } from "./custom";

export class NotFoundErr extends CustomErr {
  statusCode = 404;

  constructor() {
    super("Route not Found");

    Object.setPrototypeOf(this, NotFoundErr.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Found" }];
  }
}
