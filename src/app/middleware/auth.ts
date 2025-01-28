import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../Errors/AppError"
import { userModel } from "../modules/Auth/Auth.model"
import config from "../config"
import jwt, { JwtPayload } from 'jsonwebtoken'

const auth=(...roles:string[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        //  <-get Toke->
        const token=req.headers.authorization
        if (!token) {
            throw new AppError(401, "Authorization token missing");

        }
        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload

        if (!decoded) {
            throw new AppError(401, "invalid token");

        }

        const { role, email } = decoded
        // <- check this user exist in database

        const isExists = await userModel.findOne({ email: email })
        if (!isExists) {
            throw new AppError(404, "This User Not Found");

        }
        // <- this user is Blocked ->
        if (isExists.isBlocked==="block") {
            throw new AppError(403, "This User is blocked");
        }

        if (!roles.includes(isExists?.role)) {
            throw new AppError(
                401,
                'You are not authorized . please logIn again',
            );
        }


        console.log("hello", role)

        if (role && !roles.includes(role)) {
            throw new AppError(
                401,
                'You are not authorized  .please logIn again',
            );
        }

        req.user = decoded as JwtPayload & { role: string };


        next()


    })
}

export default auth