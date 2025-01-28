
import config from "../../config";
import AppError from "../../Errors/AppError";
import { TCreateUser } from "./Auth.interface";
import { userModel } from "./Auth.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUserIntoDB = async (payload: TCreateUser) => {

    const isUserAlreadyExist = await userModel.findOne({ email: payload?.email })

    if (isUserAlreadyExist) {
        throw new AppError(401, "This user Already exists");

    }

    payload.password = await bcrypt.hash(payload.password, Number(config.salt_round))





    const result = await userModel.create(payload)
    return result;
}

const loginUser = async (payload: Pick<TCreateUser, "email" | "password">) => {

    const isUserExist = await userModel.findOne({email:payload.email})
    if(!isUserExist){
        throw new AppError(404,"This user Not Found");
        
    }
    if(isUserExist.isBlocked==="block"){
        throw new AppError(403, "This User is blocked");
    }
    // <- check the  password ok or not ->
    const isPassIsOk = await bcrypt.compare(payload?.password, isUserExist?.password)

    if (!isPassIsOk) {
        throw new AppError(401, "This password  is invalid");
    }

    const user = {
        id: isUserExist?._id,
        role: isUserExist?.role,
        email: isUserExist?.email
    }

    const token =jwt.sign(user,config.jwt_secret as string,{expiresIn:"30d"})

    return {
        token
    }
  


}

const updateStatusInDB =async(id:string,payload:Record<string,unknown>)=>{
    const isUserExist = await userModel.findById(id)
    if (!isUserExist) {
        throw new AppError(404, "This user Not Found");

    }
    const result= await userModel.findByIdAndUpdate(id,payload,{new:true})
    return result

}
const updateProfileInDB =async(email:string,payload:Record<string,unknown>)=>{
    const isUserExist = await userModel.findOne({email:email})
    console.log(isUserExist)
    if (!isUserExist) {
        throw new AppError(404, "This user Not Found");

    }
    const result= await userModel.findOneAndUpdate({email:email},payload,{new:true})
    return result

}
const allStudentFromDB =async()=>{
   
    const result= await userModel.find().select("-password")
    return result

}
const getSingleUser =async(id:string)=>{
   
    const result= await userModel.findOne({email:id}).select("-password")
    return result

}




export const authService = {
    createUserIntoDB,
    loginUser,
    updateStatusInDB,
    updateProfileInDB,
    allStudentFromDB,
    getSingleUser
}