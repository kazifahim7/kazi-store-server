import { z } from "zod";

export const createUserValidation=z.object({
    body:z.object({
        name:z.string({required_error:"Name is Required"}),
        email:z.string().email({message:"Enter a valid mail"}),
        password: z.string({ required_error: "Name is Required" }),
        role:z.string().default("user"),
        isBlocked:z.string().default("active"),
        
    })
})


export const loginUserValidation=z.object({
    body:z.object({
        email: z.string().email({ message: "Enter a valid mail" }),
        password: z.string({ required_error: "Name is Required" }),
    })
})

