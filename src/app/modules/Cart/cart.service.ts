import AppError from "../../Errors/AppError";
import { ProductModel } from "../Product/product.model";
import { TCartData } from "./cart.interface";
import { cartModel } from "./cart.model";


const createOrderInDB = async (value: TCartData) => {
    const result = await cartModel.create(value);
    const product = await ProductModel.findById(value.product);

    if (result) {
        await ProductModel.findByIdAndUpdate(
            value.product,
            {
                $inc: { quantity: -value.quantity },
                inStock: (product?.quantity as number) > 0 ? true : false,
            },
            { new: true },
        );
    }

    return result;
};



const totalRevenue = async (email: string) => {
    const result = await cartModel.aggregate([
        {
            $match: { email: email }
        },
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productDetails"
            }
        },

        {
            $group: {
                _id:null,
                totalCost: { $sum: "$totalPrice" },
                orderedItem: { $push: "$$ROOT" },
                customerMail:{$first:"$email"},
                customerNumber: { $first:"$number"},
                customerName: { $first:"$name"}
            }
        },
      

        // stage-3
        {
            $project: {
                totalCost: 1, _id: 0,
                customerMail:1,
                orderedItem: 1,
                customerNumber:1,
                customerName:1
            }
        }

    ])

    return result
}

const deleteProductFromDB=async(id:string,email:string)=>{
    const isProductExists= await cartModel.findById(id)
    if(!isProductExists){
        throw new AppError(404,"this product not found");
        
    }
    if(isProductExists.email!==email){
        throw new AppError(403,"this product not yours");
        
    }
    const result=await cartModel.findByIdAndDelete(id)


    return result


}



export const cartServices = {
    createOrderInDB,
    totalRevenue,
    deleteProductFromDB
};