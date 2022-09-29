import { CoordinateType } from "./common-type";

type popDensityType = "free" | "dayToDay" | "crowded" | "busted";
type terrainDominationType = "sandy" | "bumpy" | "flat" | "road";
type securityLevelType = "green" | "yellow" | "red";

export interface ZoneInterface {
  name: string;
  coordinates: CoordinateType[];
  popDensity: popDensityType;
  terrainDomination: terrainDominationType;
  securityLevel: securityLevelType;
}
