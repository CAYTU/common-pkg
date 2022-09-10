"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnectionErr = void 0;
const custom_1 = require("../../errors/custom");
class DBConnectionErr extends custom_1.CustomErr {
    constructor() {
        super();
        this.statusCode = 500;
        this.reason = "Error connecting to Database";
        // Only because we are extending a builtin class.
        Object.setPrototypeOf(this, DBConnectionErr.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DBConnectionErr = DBConnectionErr;
