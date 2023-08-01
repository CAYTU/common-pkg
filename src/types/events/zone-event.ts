import mongoose from "mongoose";
/**
 * Zone:
 */

export interface ZoneEventInterface {
  id: string;
  name: string;
  area: mongoose.Schema.Types.Polygon;
  country?: string;
  version: number;
}
