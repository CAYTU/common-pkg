import mongoose from "mongoose";
/**
 * Zone:
 */

export interface ZoneInterface extends mongoose.Document {
  region?: string;
  country?: string;
  name: string;
  surface?: number;
  area: mongoose.Schema.Types.Polygon;
}
