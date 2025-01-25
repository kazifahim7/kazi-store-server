import express from 'express';
import { cartController } from './cart.controller';
import validateRequest from '../../middleware/validateRequest';
import { cartSchema } from './cart.validation';
import auth from '../../middleware/auth';


const router = express.Router();

//Order a Stationery Product
router.post('/save-product',auth("admin","user"),validateRequest(cartSchema), cartController.createOrder);


// delete cart data 

router.delete("/delete-product/:id",auth("admin","user"),cartController.deleteProduct)


//Calculate Revenue from Orders (Aggregation) 

router.get("/all-product/cost", auth("admin", "user"), cartController.getTotalRevenue)


export const cartRoutes = router;