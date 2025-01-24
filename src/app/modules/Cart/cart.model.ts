import { Schema, model } from 'mongoose';
import { TCartData } from './cart.interface';



//  Create a Schema corresponding to the document interface.
const orderSchema = new Schema<TCartData>(
    {
        email: {
            type: String,
            required: [true, 'email field is required'],
        },
        product: { type: Schema.Types.ObjectId, required: [true, 'Product field is required'], ref:"Product"},
        quantity: { type: Number, required: [true, 'Quantity field is required'] },
        totalPrice: {
            type: Number,
            required: [true, 'TotalPrice field is required'],
        },
    },
    {
        timestamps: true,
    },
);

// order model created
export const cartModel = model<TCartData>('cart', orderSchema);