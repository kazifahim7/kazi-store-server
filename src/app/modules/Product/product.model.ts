import { Schema, model } from 'mongoose';
import { Product } from './product.interface';
import { string } from 'zod';

//Create a Schema corresponding to the document interface.
const productSchema = new Schema<Product>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },
        brand: {
            type: String,
            required: [true, 'Product brand is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
        },
        category: {
            type: String,
            enum: {
                values: [
                    'file',
                    'ball pen',
                    'sticker',
                    'color pencil',
                    'eraser',
                ],
                message: '{VALUE} not valid',
            },
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        inStock: {
            type: Boolean,
            required: [true, 'Product stock status is required'],
        },
        img:{type:String,default:""}
    },
    {
        timestamps: true, 
    },
);

//  Create a Model.

export const ProductModel = model<Product>('Product', productSchema);