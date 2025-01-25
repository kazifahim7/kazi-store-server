import { Types } from "mongoose"

export type PayMentData={
  customerMail:string,
  orderStatus: "Pending" | "Shipping",
  paymentStatus:boolean,
  paymentId?:string,
  totalCost:string,
  customerName:string,
  customerNumber:string,
  orderProducts:{
    productId: Types.ObjectId,
    address:string,
    quantity:string,
    totalPrice:string
    
  }[]
}