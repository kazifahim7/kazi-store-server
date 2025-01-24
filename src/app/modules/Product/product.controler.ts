import { Request, Response } from 'express';
import config from '../../config';
import { productServices } from './product.service';
import catchAsync from '../../utils/catchAsync';


const createProduct = catchAsync(async (req: Request, res: Response) => {

    const value = req.body;

    const result = await productServices.saveProductInDB(value);

    res.status(200).json({
        message: 'Product created successfully',
        success: true,
        data: result,
    });

})

const getAllProduct = catchAsync(async (req: Request, res: Response) => {

    const query = req.query



    const result = await productServices.getAllProduct(query);

    res.status(200).json({
        message: 'Products retrieved successfully',
        status: true,
        data: result,
    });

    

})
const getProductByID = catchAsync(async (req: Request, res: Response) => {

    const value = req.params.productId;

    const result = await productServices.getProductByID(value);

    res.status(200).json({
        message: 'Products retrieved successfully',
        status: true,
        data: result,
    });



})
const updateProductByID = catchAsync(async (req: Request, res: Response) => {
   
        const value = req.params.productId;
        const data = req.body;

        const result = await productServices.updateProductByID(value, data);

        res.status(200).json({
            message: 'Product updated successfully',
            status: true,
            data: result,
        });

        

})

const deleteProductByID = catchAsync(async (req: Request, res: Response) => {
   
        const value = req.params.productId;

        await productServices.deleteProductByID(value);

        res.status(200).json({
            message: 'Product deleted successfully',
            status: true,
            data: {},
        });

})

export const productController = {
    createProduct,
    getAllProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
};