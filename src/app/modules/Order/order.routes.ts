import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { paymentZodSchema } from './order.validation'
import { paymentController } from './Order.controller'


const router=express.Router()

router.post("/create-payment",validateRequest(paymentZodSchema),paymentController.createPayment)


router.post('/payment-success/:id',paymentController.successPayment)
router.post('/payment-fail/:id',paymentController.failPayment)









export const paymentRouter=router