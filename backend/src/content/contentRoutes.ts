import { Router } from "express"
import { getContentController,setContentController } from "./contentControllers"


const ContentRoutes : Router = Router()


ContentRoutes.post("/create-link",setContentController)
ContentRoutes.get("/get-all-links",getContentController)


export {ContentRoutes}