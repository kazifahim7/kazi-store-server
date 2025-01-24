import express from 'express'
import { authRouter } from '../modules/Auth/Auth.roter'

const router = express.Router()

const moduleRouter=[
    {
        path:"/auth",
        route:authRouter
    }
]


moduleRouter.forEach((route)=>router.use(route.path,route.route))


export default router