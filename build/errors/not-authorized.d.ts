import { CustomErr } from "./custom";
export declare class NotAuthorizedErr extends CustomErr {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
