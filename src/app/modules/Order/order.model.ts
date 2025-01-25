import mongoose, { Types } from "mongoose";
import { PayMentData } from "./order.interface";

// Sub-schema for order products
const orderProductSchema = new mongoose.Schema({
    productId: { type: Types.ObjectId, required: true, ref: "Product" }, 
    address: { type: String, required: true },
    quantity: { type: String, required: true },
    totalPrice: { type: String, required: true },
});

// Main schema for payment data
const paymentSchema = new mongoose.Schema<PayMentData>({
    customerMail: { type: String, required: true },
    orderStatus: { type: String, enum: ["Pending","Shipping"], default:"Pending" },
    paymentStatus: { type: Boolean, default:false },
    paymentId: { type: String },
    totalCost: { type: String, required: true },
    customerName: { type: String, required: true },
    customerNumber: { type: String, required: true },
    orderProducts: { type: [orderProductSchema], required: true }, 
},{
    timestamps:true
});

// Create the Mongoose model
const PaymentModel = mongoose.model<PayMentData>("Payment", paymentSchema);

export default PaymentModel;
