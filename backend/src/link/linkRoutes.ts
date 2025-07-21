import { Router } from "express";
import { getLinkController } from "./linkControllers";


const LinkRoutes = Router();

LinkRoutes.get("/get-link",getLinkController)


export {LinkRoutes}