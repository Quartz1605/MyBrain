import { Router } from "express"
import { getContentController,setContentController,shareLinkController,deleteContentController} from "./contentControllers"
import { UserMiddleware } from "../middlewares/userMiddleware"


const ContentRoutes : Router = Router()


ContentRoutes.post("/create-link",UserMiddleware,setContentController)
ContentRoutes.get("/get-all-links",UserMiddleware,getContentController)
ContentRoutes.get("/get-user-links/:id",shareLinkController)
ContentRoutes.delete("/delete-link/:id",UserMiddleware,deleteContentController)


export {ContentRoutes}