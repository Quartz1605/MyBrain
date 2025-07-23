import { TagsModel } from "./tagSchema";
import { CustomRequest } from "../middlewares/userMiddleware";
import { Response } from "express";
import { UserModel } from "../auth/userSchema";


const createTag = async(req : CustomRequest,res : Response) => {

  const email : string | undefined = req.email

  try{
    
    const userExists = await UserModel.findOne({
      "email" : email
    })

    if(!userExists){
      return res.status(404).json({"message" : "User doesn't exist"})
    }

    const tag = await TagsModel.create({
      title : req.body.title,
    })

    if(!tag){
      return res.status(403).json({"message" : "Error creating a tag."})
    }

    return res.status(201).json({"message" : "Tag added successfully."})

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}

const getTags = async(req : CustomRequest,res : Response) => {

  const email : string | undefined = req.email

  try{
    
    const tags = await TagsModel.find({})

    if(!tags){
      return res.status(403).json({"message" : "Error fetching tags"})
    }

    return res.status(200).json({"tags" : tags})

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}

export {getTags,createTag}

