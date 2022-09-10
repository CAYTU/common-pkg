"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErr = void 0;
class CustomErr extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomErr.prototype);
    }
}
exports.CustomErr = CustomErr;
