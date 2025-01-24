import { model, Schema } from "mongoose";
import { TCreateUser } from "./Auth.interface";
import { string } from "zod";

const userSchema= new Schema<TCreateUser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"},
    isBlocked: { type: String, enum: ["active", "block"],default:"active"},
    address:{type:String}
 




},{timestamps:true})

export const userModel = model<TCreateUser>('User', userSchema);
