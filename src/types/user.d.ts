import { Types } from "mongoose";

export type RoleType = "create" | "edit" | "readOnly" | "delete" | "all";

export interface UserInterface {
  username: string;
  zone: Types.ObjectId;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  image: string;
  roles: RoleType[];
}
