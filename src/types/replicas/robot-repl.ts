import mongoose from "mongoose";
import { Point, RoboticPlatform } from "../utils";

export interface RobotRepInterface extends mongoose.Document {
  id: string;
  name: string;
  platform?: RoboticPlatform;
  type: string;
  image: string;
  fcmToken?: string;
  lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
}
