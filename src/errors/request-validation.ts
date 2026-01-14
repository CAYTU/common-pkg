import { ValidationError } from "express-validator";
import { CustomErr } from "./custom";

export class RequestValidationErr extends CustomErr {
  statusCode = 400;

  constructor(public errs: ValidationError[]) {
    super();

    // Only just because we are extending a builtin class
    Object.setPrototypeOf(this, RequestValidationErr.prototype);
  }

  serializeErrors() {
    return this.errs.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
