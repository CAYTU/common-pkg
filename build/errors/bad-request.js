"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestErr = void 0;
const custom_1 = require("./custom");
class BadRequestErr extends custom_1.CustomErr {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestErr.prototype);
    }
    serializeErrors() {
        return [{ message: this.msg }];
    }
}
exports.BadRequestErr = BadRequestErr;
