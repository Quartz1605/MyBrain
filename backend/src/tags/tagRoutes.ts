import { Router } from "express"
import { getTags,createTag } from "./tagsControllers"


const TagRoutes : Router = Router()


TagRoutes.post("/create-tag",createTag)
TagRoutes.get("/get-all-tags",getTags)


export {TagRoutes}