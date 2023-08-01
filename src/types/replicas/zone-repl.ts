import mongoose from "mongoose";
/**
 * Zone:
 */

export interface ZoneRepInterface extends mongoose.Document {
  id: string;
  name: string;
  area: mongoose.Schema.Types.Polygon;
  country?: string;
}
