import jwt from "jsonwebtoken";

export const generateJWT = <T>(data: T) => {
  return jwt.sign(data as {}, `${process.env.PAYLOAD_PRIVATE_KEY}`, {
    expiresIn: "1d",
  });
};