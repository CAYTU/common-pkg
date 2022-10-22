import { Request, Response, NextFunction } from "express";
import { CustomErr } from "../../errors/custom";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomErr) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  console.log(err);

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};

export { errorHandler };
