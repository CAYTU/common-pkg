import { Request, Response, NextFunction } from "express";
declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { errorHandler };
