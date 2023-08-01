import mongoose, { Types } from "mongoose";
import { Point, RobotStates, RoboticPlatform } from "../utils";
/**
 * Robot:
 */

export interface RobotMetaDataInterface extends mongoose.Document {
  robot: Types.ObjectId;
  batteryLevel?: number;
  speed?: number;
  controlMode?: string | number;
  faultCode?: number | string;
  currentTask?: Types.ObjectId;
  linearVelocity?: number;
  angularVelocity?: number;
  position?: {
    lng: number;
    lat: number;
  };
  data?: any;
}

export interface RobotStateTrackerInterface extends mongoose.Document {
  unavailable?: Date;
  running?: Date;
  faile?: Date;
  available?: Date;
}

// You can generate doc like this for an interface
// export interface RobotInterface extends mongoose.Document {
// ...
// }
// Then run this command: npx ts-json-schema-generator --path "src/types/models/index.ts" --type RobotInterface --tsconfig "tsconfig.json" --jsDoc "extended"
// Then copy the generated schema and paste it here
// Then you can use it in the model like this:
// const RobotSchema = new Schema<CTypes.RobotInterface>(RobotSchemaJSON);

// However, it would best practice to separate the
// the model into two models: AwsRobot and FreedomRobot or
// create a base model and extend it to AwsRobot and FreedomRobot
// models. This is because the two models have different attributes
// and it would be hard to maintain the code if we use one model
// for both of them.
export interface RobotBaseInterface extends mongoose.Document {
  name: string;
  type: string;
  platform?: RoboticPlatform;
  platformRobotId: Types.ObjectId;
  image: string;
  privateToken?: string; // This is the token that is used to authenticate the robot in the backend
  fcmToken?: string;
  isOnline?: boolean;
  state?: RobotStates;
  taskCount?: number;
  assignedTaskCount?: number;
  zone?: Types.ObjectId;
  lastRecordedLocation?: mongoose.Schema.Types.Point & Point;
  currentTask?: Types.ObjectId;
  // Time Tracker
  stateTracker?: Types.ObjectId;
}

export interface AwsRobotInterface {
  // If platform is "aws-iot"
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
  region?: string;
  endpoint?: string;
  thing?: string;
}

export interface FreedomRobotInterface {
  // If platform is "freedom-robotics"
  secret?: string;
  accountId?: string;
  deviceId?: string;
  privateToken?: string; // This is the token that is used to authenticate the robot in the backend
}
