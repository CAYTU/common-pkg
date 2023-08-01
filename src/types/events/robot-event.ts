import mongoose from "mongoose";
import { Point, RoboticPlatform } from "../utils";

export interface RobotEventInterface {
  id: string;
  name: string;
  type: string;
  platform?: RoboticPlatform;
  image: string;
  fcmToken?: string;
  lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
  version: number;
}
