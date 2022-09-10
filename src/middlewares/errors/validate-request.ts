import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationErr } from "../../errors/request-validation";

export const validateRequestErr = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new RequestValidationErr(errs.array());
  }
  next();
};
