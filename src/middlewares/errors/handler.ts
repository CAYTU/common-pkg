import { Request, Response, NextFunction } from "express";
import { CustomErr } from "../../errors/custom";

/**
 * Shape of a Mongoose ValidationError without importing mongoose here. A schema
 * that rejects a value throws this, and it used to fall through to the generic
 * branch — so a login blocked by a stale role enum told the user "Something went
 * wrong" and told the operator nothing but a stack trace.
 */
interface MongooseValidationError {
  name: "ValidationError";
  errors: Record<string, { path?: string; message?: string }>;
}

const isValidationError = (err: any): err is MongooseValidationError =>
  err?.name === "ValidationError" &&
  err.errors &&
  typeof err.errors === "object";

/** Mongo duplicate-key error — a unique index rejecting an insert or update. */
const isDuplicateKeyError = (err: any): boolean =>
  err?.code === 11000 || err?.code === 11001;

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof CustomErr) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  // Always log the real error with enough context to find the request that
  // caused it — the generic client response is not the operator's only record.
  const context = {
    method: req.method,
    path: req.originalUrl,
    userId: (req as any).currentUser?.id,
  };

  if (isValidationError(err)) {
    // The failing fields are schema constraint names, not secrets, and they are
    // the actionable part. A stale enum value on a stored document surfaces here
    // as e.g. `roles.0: 'all' is not a valid enum value` rather than a shrug.
    const fields = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    console.error("[validation]", { ...context, fields });

    return res.status(400).send({
      errors: fields.map((f) => ({
        message: f.message ?? "Invalid value",
        field: f.field,
      })),
    });
  }

  if (isDuplicateKeyError(err)) {
    console.error("[duplicate-key]", {
      ...context,
      keyValue: (err as any).keyValue,
    });
    return res.status(409).send({
      errors: [{ message: "That value is already taken." }],
    });
  }

  // Genuinely unexpected. Log it in full; keep the client response opaque so an
  // internal error never leaks a stack trace or an implementation detail.
  console.error("[unhandled]", context, err);

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};

export { errorHandler };
