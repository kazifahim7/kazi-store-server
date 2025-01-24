import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { createUserValidation, loginUserValidation } from './Auth.zodValidation'
import { authController } from './Auth.controller'
import auth from '../../middleware/auth'

const router = express.Router()

router.post("/create-user", validateRequest(createUserValidation), authController.createUser)


router.post("/login", validateRequest(loginUserValidation),authController.logInUser)

router.patch("/update-status/:id",auth("admin"),authController.updateStatus)

router.put("/update-profile/:id", authController.updateProfile)

router.get("/all-users", auth("admin") ,authController.allUsers)

router.get("/user/:id",authController.singleUser)








export const authRouter = router


