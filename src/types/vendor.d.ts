import { Types } from "mongoose";
import { CoordinateType } from "./common-type";

export interface VendorInterface {
  name: string;
  businessField: string;
  vaxOrTax: number;
  address: string;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  coverImage: string;
  logo: string;
  zone: Types.ObjectId;
  coordinates: CoordinateType;
  owner: Types.ObjectId;
};
