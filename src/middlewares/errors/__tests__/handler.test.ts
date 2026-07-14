import { errorHandler } from "../handler";
import { CustomErr } from "../../../errors/custom";

class TestErr extends CustomErr {
  statusCode = 418;
  constructor() {
    super("teapot");
    Object.setPrototypeOf(this, TestErr.prototype);
  }
  serializeErrors() {
    return [{ message: "teapot" }];
  }
}

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const req: any = { method: "POST", originalUrl: "/api/auth/login" };
const next = jest.fn();

describe("errorHandler", () => {
  beforeEach(() => jest.spyOn(console, "error").mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it("passes a CustomErr through with its own status", async () => {
    const res = mockRes();
    await errorHandler(new TestErr(), req, res, next);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.send).toHaveBeenCalledWith({ errors: [{ message: "teapot" }] });
  });

  // The bug this fixes: a schema rejection surfaced as "Something went wrong".
  it("surfaces the failing fields of a ValidationError", async () => {
    const err = {
      name: "ValidationError",
      errors: {
        "roles.0": {
          path: "roles.0",
          message: "`all` is not a valid enum value for path `roles.0`.",
        },
      },
    };
    const res = mockRes();

    await errorHandler(err as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [
        {
          message: "`all` is not a valid enum value for path `roles.0`.",
          field: "roles.0",
        },
      ],
    });
  });

  it("maps a duplicate key to 409", async () => {
    const res = mockRes();
    await errorHandler(
      { code: 11000, keyValue: { email: "a@b.c" } } as any,
      req,
      res,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(409);
  });

  // An unexpected error must stay opaque to the caller — no stack, no internals.
  it("keeps an unknown error generic to the client, but logs it", async () => {
    const res = mockRes();
    await errorHandler(new Error("kaboom"), req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      errors: [{ message: "Something went wrong" }],
    });
    expect(console.error).toHaveBeenCalled();
  });
});
