import { CustomErr } from "../../errors/custom";
export declare class DBConnectionErr extends CustomErr {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
