
import { Request, Response } from 'express';
import { ProductModel } from '../Product/product.model';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../Errors/AppError';
import { cartServices } from './cart.service';


const createOrder = catchAsync(async (req: Request, res: Response) => {

    const value = req.body;

    // find product by id

    const product = await ProductModel.findById(value.product);
    if (!product) {
        throw new AppError(404, "This Product not Found");

    } else if (product.quantity < value.quantity || product.inStock === false) {
        throw new AppError(404, 'insufficient stock');
    }

    value.totalPrice = product.price * value.quantity

    const result = await cartServices.createOrderInDB(value);

    res.status(200).json({
        message: 'Product added to cart successfully',
        success: true,
        data: result,
    });



})


const getTotalRevenue = catchAsync(async (req: Request, res: Response) => {

    const user = req.user

    const result = await cartServices.totalRevenue(user?.email)



    if (!result) {
        throw new AppError(404, 'Order not found');
    }

    res.status(200).json({
        message: 'Revenue calculated successfully',
        success: true,
        data: result[0],
    });




}
)

const deleteProduct = catchAsync(async(req,res)=>{
    const id=req?.params?.id
    const email=req?.user?.email
    const result = await cartServices.deleteProductFromDB(id,email)
    res.status(200).json({
        message: 'Data Delete successfully',
        success: true,
        data:{}
    });
})




export const cartController = {
    createOrder,
    getTotalRevenue,
    deleteProduct
};