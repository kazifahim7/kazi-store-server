import express from 'express';
import { productController } from './product.controler';
import validateRequest from '../../middleware/validateRequest';
import { productSchema } from './product.validation';
import auth from '../../middleware/auth';

const router = express.Router();

//1. Create a Stationery Product
router.post('/create-products',auth("admin"),validateRequest(productSchema), productController.createProduct);

//2. Get All Stationery Products
router.get('/all-products',auth("admin","user"), productController.getAllProduct);

//3. Get a Specific Stationery Product
router.get('/single-product/:productId', auth("admin", "user"), productController.getProductByID);

//4. Update a Stationery Product
router.put('/products-update/:productId', auth("admin"), productController.updateProductByID);

// 5. Delete a Stationery Product

router.delete('/delete-products/:productId', auth("admin"), productController.deleteProductByID);

export const productRouter = router;