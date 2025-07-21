import { Request,Response } from "express"; 
import { CustomRequest } from "./middlewares/userMiddleware";

interface HttpReqRes{
  req : CustomRequest,
  res : Response
}

export {HttpReqRes}