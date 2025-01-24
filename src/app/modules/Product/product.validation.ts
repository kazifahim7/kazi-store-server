import { z } from 'zod';

export const productSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Product name is required',
        }),
        brand: z.string({
            required_error: 'Product brand is required',
        }),
        price: z.number({
            required_error: 'Product price is required',
        }),
        category: z.enum(['file', 'ball pen', 'sticker', 'color pencil', 'eraser'], {
            invalid_type_error: '{VALUE} not valid',
        }),
        description: z.string({
            required_error: 'Product description is required',
        }),
        quantity: z.number({
            required_error: 'Product quantity is required',
        }),
        inStock: z.boolean({
            required_error: 'Product stock status is required',
        }),
        img: z.string().optional().default(''),
    }),
});




