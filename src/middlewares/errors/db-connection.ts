import { CustomErr } from "../../errors/custom";

export class DBConnectionErr extends CustomErr {
  statusCode = 500;
  reason = "Error connecting to Database";

  constructor() {
    super();

    // Only because we are extending a builtin class.
    Object.setPrototypeOf(this, DBConnectionErr.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
