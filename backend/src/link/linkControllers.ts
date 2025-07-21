import { CustomRequest } from "../middlewares/userMiddleware";
import { Response } from "express";
import { UserModel } from "../auth/userSchema";
import { LinkModel } from "./linkSchema";


const getLinkController = async(req : CustomRequest,res : Response) => {

  const email = req.email

  try{

    if(!email){
      return res.status(401).json({"message" : "User not found"})
    }

    const user = await UserModel.findOne({
      "email" :  email
    })

    if(!user){
      return res.status(401).json({"message" : "User not found."})
    }

    const linkExists = await LinkModel.findOne({
      "userId" : user._id
    })

    if(!linkExists){

      const link = await LinkModel.create({
      "link" : user._id,
      "userId" : user._id
      })

      if(link){
        return res.status(201).json({"message" : "Link created successfully","link" : link.link})
      }
      else{
        return res.status(400).json({"message" : "Error creating link."})
      }
    }else{
      
      return res.status(200).json({"link" : linkExists.link})
    }

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}

export {getLinkController}