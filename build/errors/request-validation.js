"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationErr = void 0;
const custom_1 = require("./custom");
class RequestValidationErr extends custom_1.CustomErr {
    constructor(errs) {
        super();
        this.errs = errs;
        this.statusCode = 400;
        // Only just because we are extending a builtin class
        Object.setPrototypeOf(this, RequestValidationErr.prototype);
    }
    serializeErrors() {
        return this.errs.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}
exports.RequestValidationErr = RequestValidationErr;
