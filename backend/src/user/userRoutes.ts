import { getUserinfoContoller } from "./userController";
import { Router } from "express";


const userRoutes = Router()


userRoutes.get("/get-user",getUserinfoContoller)

export {userRoutes}
