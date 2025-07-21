import { Router } from "express"
import { userSignupController,userLoginController } from "./AuthControllers"



const AuthRoutes : Router = Router()


AuthRoutes.post("/signup",userSignupController)
AuthRoutes.post("/login",userLoginController)


export {AuthRoutes}