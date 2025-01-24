import express from 'express'
import { authRouter } from '../modules/Auth/Auth.roter'
import { productRouter } from '../modules/Product/product.route'

const router = express.Router()

const moduleRouter=[
    {
        path:"/auth",
        route:authRouter
    },
    {
        path:"/product",
        route:productRouter
    }
]


moduleRouter.forEach((route)=>router.use(route.path,route.route))


export default router