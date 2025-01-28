import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { paymentZodSchema } from './order.validation'
import { paymentController } from './Order.controller'
import auth from '../../middleware/auth'


const router=express.Router()

router.post("/create-payment",auth("admin","user"),validateRequest(paymentZodSchema),paymentController.createPayment)


router.post('/payment-success/:id',paymentController.successPayment)
router.post('/payment-fail/:id',paymentController.failPayment)


router.get("/all-payment",auth("admin"),paymentController.allPayment)
router.patch("/update-payment/:id",auth("admin"),paymentController.updatePayment)
router.get("/my-payment/:email",auth("admin","user"),paymentController.myPayment)










export const paymentRouter=router