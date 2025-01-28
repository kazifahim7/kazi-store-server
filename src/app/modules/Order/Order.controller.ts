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
  
    res.redirect('http://localhost:5173/success')
    
})
const failPayment =catchAsync(async(req:Request,res:Response)=>{
  
    const result = await paymentService.failPayment(req?.params.id)


    // here redirect to frontend fail page
  
    res.redirect('http://localhost:5173/fail')
})



const allPayment = catchAsync(async(req,res)=>{
    const result = await paymentService.allPaymentFromDB()
    res.status(200).json({
        success: true,
        message: "All payment Data",
        data: result
    })
})
const myPayment = catchAsync(async(req,res)=>{
    const result = await paymentService.myPaymentFromDB(req?.params?.email)
    res.status(200).json({
        success: true,
        message: "All payment Data",
        data: result
    })
})
const updatePayment = catchAsync(async(req,res)=>{
    const result = await paymentService.updatePaymentStatusFromDB(req?.params?.id,req.body)
    res.status(200).json({
        success: true,
        message: "orderStatus updated successfully",
        data: result
    })
})


export const paymentController={
    createPayment,
    successPayment,
    failPayment,
    allPayment,
    myPayment,
    updatePayment
}