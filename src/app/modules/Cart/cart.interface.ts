import { Types } from "mongoose";

export type TCartData = {
    email: string;
    product: Types.ObjectId;
    totalPrice?: number;
    quantity: number;
    address:string,
    number?:string
    name:string
};