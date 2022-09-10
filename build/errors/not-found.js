"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErr = void 0;
const custom_1 = require("./custom");
class NotFoundErr extends custom_1.CustomErr {
    constructor() {
        super("Route not Found");
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundErr.prototype);
    }
    serializeErrors() {
        return [{ message: "Not Found" }];
    }
}
exports.NotFoundErr = NotFoundErr;
