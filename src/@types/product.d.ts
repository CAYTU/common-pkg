import { Types } from "mongoose";

export interface ProductInterface {
  name: string;
  type: string;
  quantity: number;
  agent: Types.ObjectId;
  price: number;
  discountType: string;
  discount: number;
  category: Types.ObjectId;
  image: string;
  description?: string;
}
