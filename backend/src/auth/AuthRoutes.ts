import { Router } from "express"
import { userSignupController,userLoginController,userLogoutController } from "./AuthControllers"
import { UserMiddleware } from "../middlewares/userMiddleware"



const AuthRoutes : Router = Router()


AuthRoutes.post("/signup",userSignupController)
AuthRoutes.post("/login",userLoginController)
AuthRoutes.post("/logout",UserMiddleware,userLogoutController)


export {AuthRoutes}