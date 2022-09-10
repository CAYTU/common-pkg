import { CustomErr } from "./custom";
export declare class NotFoundErr extends CustomErr {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
