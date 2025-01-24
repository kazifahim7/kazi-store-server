
import { Product } from './product.interface';

import QueryBuilder from '../../builder/QueryBuilder';
import { ProductModel } from './product.model';

const saveProductInDB = async (data: Product) => {
    const result = await ProductModel.create(data);
    return result;
};

const getAllProduct = async (query: Record<string,unknown>) => {
    
   
    const allProductQuery = new QueryBuilder(ProductModel.find(), query).search(["name","brand","category"]).sort().paginate().filter()

    const result= await allProductQuery.modelQuery
    const meta = await allProductQuery.countTotal()
   
    
    return {result,meta};
};
const getProductByID = async (id: string) => {
    const result = await ProductModel.findById(id);
    return result;
};
const updateProductByID = async (id: string, data: Record<string, unknown>) => {
    const result = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    return result;
};
const deleteProductByID = async (id: string) => {
    const result = await ProductModel.findByIdAndDelete(id, { new: true });
    return result;
};

export const productServices = {
    saveProductInDB,
    getAllProduct,
    getProductByID,
    updateProductByID,
    deleteProductByID,
};