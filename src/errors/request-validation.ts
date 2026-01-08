import { ValidationError, FieldValidationError } from "express-validator";
import { CustomErr } from "./custom";

export class RequestValidationErr extends CustomErr {
  statusCode = 400;
  
  constructor(public errs: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationErr.prototype);
  }
  
  serializeErrors() {
    return this.errs.map((err) => {
      // Type narrowing: check if it's a FieldValidationError
      if (err.type === 'field') {
        return { 
          message: err.msg, 
          field: err.path // Note: it's 'path' in v7+, not 'param'
        };
      }
      // Handle other error types
      return { 
        message: err.msg, 
        field: 'unknown' 
      };
    });
  }
}