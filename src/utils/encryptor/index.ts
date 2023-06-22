// We'll provide 2 tools (functions) to encrypt and decrypt data using
// bcryptjs. We'll use these tools to encrypt and decrypt the refresh and access
// tokens.

import CryptoJS from "crypto-js";
import { UserRole } from "../../types/utils";

export interface UserPayload {
  id: string;
  username: string;
  roles?: UserRole[];
  iat?: number; // Issued at time
  exp?: number; // Expiration time
}

type ExpireTime = "1h" | "1d" | "1w" | "1m" | "1y" | "15m" | "30m" | "45m";

export const setIatAndExpTime = (expireTime?: ExpireTime) => {
  const iat = Math.floor(Date.now() / 1000);

  // Set expiration time (if not provided then set to 15 minutes as default)
  // check the expireTime variable and based on that set the expiration time
  // for the token

  let exp: number;
  expireTime = expireTime ?? "15m";
  const time = expireTime.slice(0, -1);
  const unit = expireTime.slice(-1);

  switch (unit) {
    case "h":
      exp = iat + 60 * 60 * Number(time);
      break;
    case "d":
      exp = iat + 60 * 60 * 24 * Number(time);
      break;
    case "w":
      exp = iat + 60 * 60 * 24 * 7 * Number(time);
      break;
    case "m":
      exp = iat + 60 * 60 * 24 * 30 * Number(time);
      break;
    case "y":
      exp = iat + 60 * 60 * 24 * 365 * Number(time);
      break;
    default:
      exp = iat + 60 * 15;
      break;
  }

  return { iat, exp };
};

export const encryptToken = (
  data: UserPayload,
  secret: string,
  expireTime?: ExpireTime
) => {
  // Set iat and exp time
  const { iat, exp } = setIatAndExpTime(expireTime);

  // Set the payload
  const payload: UserPayload = {
    id: data.id,
    username: data.username,
    roles: data.roles,
    iat,
    exp,
  };

  // Encrypt the payload
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secret
  ).toString();

  console.log("Payload: ", payload);
  console.log("Encrypted token: ", encryptedToken)
  console.log("secret: ", secret);

  return encryptedToken;
};

export const decryptToken = (
  encryptedToken: string,
  secret: string
): UserPayload => {
  // Decrypt the token
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secret);
  const decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // Check if the token is valid
  if (decryptedToken.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token has expired.");
  }

  return decryptedToken;
};
