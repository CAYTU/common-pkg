"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestErr = void 0;
const express_validator_1 = require("express-validator");
const request_validation_1 = require("../../errors/request-validation");
const validateRequestErr = (req, res, next) => {
    const errs = (0, express_validator_1.validationResult)(req);
    if (!errs.isEmpty()) {
        throw new request_validation_1.RequestValidationErr(errs.array());
    }
    next();
};
exports.validateRequestErr = validateRequestErr;
