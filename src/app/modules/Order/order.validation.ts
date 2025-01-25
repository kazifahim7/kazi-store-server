import { z } from "zod";

// Zod schema for individual order products
const orderProductZodSchema = z.object({
    productId: z.string(),
    address: z.string().min(1, "Address is required"),
    quantity: z.string().min(1, "Quantity is required"),
    totalPrice: z.string().min(1, "Total price is required"),
});

// Zod schema for the main payment data
const paymentZodSchema = z.object({
    body: z.object({
        customerMail: z.string().email("Invalid email address"),
        paymentId: z.string().min(1, "Payment ID is required").optional(),
        totalCost: z.string().min(1, "Total cost is required"),
        orderProducts: z.array(orderProductZodSchema).nonempty("Order products cannot be empty"),
    })
});

export { paymentZodSchema };
