export declare abstract class CustomErr extends Error {
    abstract statusCode: number;
    constructor(message?: string);
    abstract serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
