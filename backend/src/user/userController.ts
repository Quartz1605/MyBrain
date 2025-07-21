import { UserModel } from "../auth/userSchema";
import { Response,Request } from "express";
import { CustomRequest } from "../middlewares/userMiddleware";


const getUserinfoContoller = async (req : CustomRequest,res : Response) => {

  const email : string | undefined = req.email

  const user = await UserModel.findOne({
    "email" : email
  })

  if(!user){
    return res.status(401).json({"message" : "User not found."})
  }

  return res.status(200).json({"user" : user})

}

export {getUserinfoContoller}