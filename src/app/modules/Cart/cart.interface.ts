import { Types } from "mongoose";

export type TCartData = {
    email: string;
    product: Types.ObjectId;
    quantity: number;
    totalPrice?: number;
    address:string,
    number?:string
    name:string
};