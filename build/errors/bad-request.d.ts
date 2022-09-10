import { CustomErr } from "./custom";
export declare class BadRequestErr extends CustomErr {
    msg: string;
    statusCode: number;
    constructor(msg: string);
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
