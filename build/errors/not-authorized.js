"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedErr = void 0;
const custom_1 = require("./custom");
class NotAuthorizedErr extends custom_1.CustomErr {
    constructor() {
        super();
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedErr.prototype);
    }
    serializeErrors() {
        return [{ message: "Not Authorized." }];
    }
}
exports.NotAuthorizedErr = NotAuthorizedErr;
