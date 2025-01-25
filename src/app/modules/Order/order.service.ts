import { Types } from "mongoose";
import { PayMentData } from "./order.interface";
import SSLCommerzPayment from 'sslcommerz-lts'
import config from "../../config";
import PaymentModel from "./order.model";
import AppError from "../../Errors/AppError";

const store_id = config.store_id
const store_passwd = config.store_pass
const is_live = false 

const createPaymentInDB=async(payload:PayMentData)=>{
   
    payload.paymentId= new Types.ObjectId().toString()
    payload.orderStatus="Pending",
    payload.paymentStatus=false
   

    let GatewayPageURL;

    // <- sslcommerz payment->
    const data = {
        total_amount: payload?.totalCost,
        currency: 'BDT',
        tran_id: payload?.paymentId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/api/v1/payment/payment-success/${payload?.paymentId}`,
        fail_url: `http://localhost:5000/api/v1/payment/payment-fail/${payload?.paymentId}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload?.customerName,
        cus_email: payload?.customerMail,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: payload.customerNumber,
        cus_fax: '01711111111',
        ship_name: payload?.customerName,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    try {
        const apiResponse = await sslcz.init(data);  
        GatewayPageURL = apiResponse.GatewayPageURL;
        console.log(GatewayPageURL);

        if(GatewayPageURL){
            await PaymentModel.create(payload)
        }

        // You can return the GatewayPageURL or use it as needed
        return {url:GatewayPageURL};
    } catch (error) {
        console.error('Payment initialization failed:', error);
        // Handle error appropriately, e.g., return a fallback value or throw an error
        throw new Error('Payment initialization failed');
    }

}


const successPayment=async(id:string)=>{

    const isExists = await PaymentModel.findOne({ paymentId :id})
    if(!isExists){
        throw new AppError(404,"this Payment data not found");
        
    }
    const result = await PaymentModel.findOneAndUpdate({ paymentId: id }, { paymentStatus : true},{new:true})

    return result

}
const failPayment =async(id:string)=>{

    const isExists = await PaymentModel.findOne({ paymentId :id})
    if(!isExists){
        throw new AppError(404,"this Payment data not found");
        
    }
    const result = await PaymentModel.findOneAndDelete({ paymentId: id })

    return result

}



export const paymentService={
    createPaymentInDB,
    successPayment,
    failPayment
}