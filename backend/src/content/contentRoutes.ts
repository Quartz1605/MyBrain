import { Router } from "express"
import { getContentController,setContentController,shareLinkController} from "./contentControllers"
import { UserMiddleware } from "../middlewares/userMiddleware"


const ContentRoutes : Router = Router()


ContentRoutes.post("/create-link",UserMiddleware,setContentController)
ContentRoutes.get("/get-all-links",UserMiddleware,getContentController)
ContentRoutes.get("/get-user-links/:id",shareLinkController)


export {ContentRoutes}