import { ValidationError } from "express-validator";
import { CustomErr } from "./custom";
export declare class RequestValidationErr extends CustomErr {
    errs: ValidationError[];
    statusCode: number;
    constructor(errs: ValidationError[]);
    serializeErrors(): {
        message: any;
        field: string;
    }[];
}
