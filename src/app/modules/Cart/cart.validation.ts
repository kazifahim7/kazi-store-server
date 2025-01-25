import { z } from "zod";

export const cartSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email field is required',
        }).email('Invalid email format'),
        address: z.string({
            required_error: 'address field is required',
        }),

        product: z.string({
            required_error: 'Product field is required',
        }), // Ensures the product is a valid MongoDB ObjectId

        quantity: z.number({
            required_error: 'Quantity field is required',
        }).min(1, 'Quantity must be at least 1'),

        totalPrice: z.number({
            required_error: 'TotalPrice field is required',
        }).optional(),
    }),
});
