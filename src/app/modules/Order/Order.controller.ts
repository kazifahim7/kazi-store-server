import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./order.service";

const createPayment =catchAsync(async(req:Request,res:Response)=>{
  
    const result= await paymentService.createPaymentInDB(req?.body)
    console.log(result,"from controller")
    res.status(200).json({
        success:true,
        message:"ssl commerce url link",
        data:result
    })
})
const successPayment =catchAsync(async(req:Request,res:Response)=>{
  
    const result= await paymentService.successPayment(req?.params.id)


    // here redirect to frontend success page
  
    res.status(200).json({
        success:true,
        message:"Payment success",
        data:result
    })
    
})
const failPayment =catchAsync(async(req:Request,res:Response)=>{
  
    const result = await paymentService.failPayment(req?.params.id)


    // here redirect to frontend fail page
  
    res.status(200).json({
        success:true,
        message:"Payment fail",
        data:result
    })
    
})



export const paymentController={
    createPayment,
    successPayment,
    failPayment
}