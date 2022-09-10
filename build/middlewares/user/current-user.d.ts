/// <reference types="qs" />
/// <reference types="express" />
interface UserPayload {
    id: string;
    email: string;
    roles: string[];
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export declare const currentUser: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export {};
