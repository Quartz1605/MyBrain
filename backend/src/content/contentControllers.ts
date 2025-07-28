import { CustomRequest } from "../middlewares/userMiddleware";
import { Response } from "express";
import { UserModel } from "../auth/userSchema";
import { ContentModel } from "./contentSchema";
import { TagsModel } from "../tags/tagSchema";


const setContentController = async(req:CustomRequest,res:Response) => {

  const email : string | undefined = req.email

  try{
    
    const userExists = await UserModel.findOne({
      "email" : email
    })

    if(!userExists){
      return res.status(404).json({"message" : "User doesn't exist"})
    }

    const tag = await TagsModel.findById(req.body.tag)

    if(!tag){
      return res.status(404).json({"message" : "Tag doesn't exist"})
    }

    const content = await ContentModel.create({
      link : req.body.link,
      type : req.body.type,
      title : req.body.title,
      tags : tag._id,
      userId : userExists._id
    })

    if(!content){
      return res.status(403).json({"message" : "Error adding link to brain"})
    }

    return res.status(201).json({"message" : "Link added successfully to brain."})

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}


const getContentController = async(req:CustomRequest,res:Response) => {

  const email : string | undefined = req.email

  try{
    
    const userExists = await UserModel.findOne({
      "email" : email
    })

    if(!userExists){
      return res.status(404).json({"message" : "User doesn't exist"})
    }

    const contents = await ContentModel.find({})

    if(!contents){
      return res.status(403).json({"message" : "Error fetching contents to main page."})
    }

    return res.status(200).json({"contents" : contents})

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}


export {getContentController,setContentController}

