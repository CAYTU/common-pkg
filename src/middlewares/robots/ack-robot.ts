import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import CryptoJS = require("crypto-js");
import { DeviceCategory, DeviceType, RoboticPlatform } from "../../types/utils";

export interface RobotPayload {
  name: string;
  type: DeviceType;
  category: DeviceCategory;
  platform?: RoboticPlatform;
}

declare global {
  namespace Express {
    interface Request {
      robot?: RobotPayload;
    }
  }
}

/**
 * Middleware to acknowledge the robot based on the token
 * and save the decoded payload in req.robot
 */
export const ackRobot = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let rb;

    if (!req.headers["x-robot-token"]) {
      return next();
    }

    if (req.headers["x-robot-token"]) {
      try {
        // Grab the secret and token
        let token = req.headers["x-robot-token"] as string;

        // Decrypt
        try {
          var bytes = CryptoJS.AES.decrypt(token, `${process.env.ROBOT_TOKEN}`);
          var decryptedData = JSON.parse(
            bytes.toString(CryptoJS.enc.Utf8),
          ) as RobotPayload;
        } catch (err) {
          console.log("Token decryption failed");
          return next();
        }

        rb = decryptedData;
        // Validate the robot token with the Secret key
      } catch (err) {
        console.log("Robot token validation failed");
        return next();
      }
    }

    // Save decoded payload in req.currentUser
    req.robot = rb as RobotPayload;

    next();
  },
);
