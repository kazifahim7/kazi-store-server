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
                _id: null,
                totalCost: { $sum: "$totalPrice" },
                orderedItem: { $push: "$$ROOT" },
            }
        },

        // stage-3
        {
            $project: {
                totalCost: 1, _id: 0,
                orderedItem: {
                    productDetails: 1, // Include the populated product details
                    quantity: 1,
                    totalPrice: 1,
                },
            }
        }

    ])

    return result
}





export const cartServices = {
    createOrderInDB,
    totalRevenue
};