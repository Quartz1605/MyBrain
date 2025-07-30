import { CustomRequest } from "../middlewares/userMiddleware";
import { Request,Response } from "express";
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

    
    const selectedTagIds = Array.isArray(req.body.selectedTags) ? req.body.selectedTags : [req.body.selectedTags];
    const tags = await TagsModel.find({ _id: { $in: selectedTagIds } });

    if (!tags || tags.length === 0) {
      return res.status(404).json({ "message": "Tag(s) don't exist" });
    }

    const tagIds = tags.map(tag => tag._id);
    const tagNames = tags.map(tag => tag.title);

    const content = await ContentModel.create({
      link: req.body.link,
      type: req.body.type,
      title: req.body.title,
      tags: tagIds,
      tagName: tagNames,
      userId: userExists._id,
      description: req.body.description
    });

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

    const contents = await ContentModel.find({
      userId : userExists._id
    })

    if(!contents){
      return res.status(403).json({"message" : "Error fetching contents to main page."})
    }

    return res.status(200).json({"contents" : contents})

  }catch(e : unknown){

    return res.status(400).json({"message" : "Some backend error happened " + e})

  }

}

const shareLinkController = async(req: Request,res:Response) => {

  try{

    const userId : String | undefined =  req.params.id;

    const user = await UserModel.findById(userId)

    if(!user){
      return res.status(404).json({"message" : "User does not exist."})
    }
    

    if(!userId){
      return res.status(403).json({"message" : "User not found"})
    }

    const content = await ContentModel.find({
      "userId" : userId
    })

    if(!content){
      return res.status(404).json({"message" : "No links for the current user."})
    }else{
      return res.status(200).json({"content" : content,"firstName" : user.firstName})
    }
  }catch(e){
    return res.status(404).json({"message" : "Some backend error happened " + e})
  }

  
}


export {getContentController,setContentController,shareLinkController}

