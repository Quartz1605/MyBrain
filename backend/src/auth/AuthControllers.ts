import { UserModel } from "./userSchema"; 
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Request,Response } from "express";

const maxAge : number = 20*24*60*60*100;

const createToken = (email : string) => {

  return jwt.sign({"email" : email},process.env.JWT_SECRET as string,{expiresIn : maxAge})

}

const userSignupController = async(req : Request,res : Response) => {

   const {email , password} : {email : string,password : string}  = req.body
  

  if(!email || !password){
    return res.status(400).json({"message" : "Email not provided"})
   }

  try{

    const userExist = await UserModel.findOne({"email" : email})

    if(userExist){

      return res.status(411).json({"message" : "User already exists,Pls Login."})

    }

    const hashPassword : string = await bcrypt.hash(password,4);
    req.body.password = hashPassword

    const user = await UserModel.create(req.body)

    if (user) {
      
      res.cookie("jwt",createToken(email),{
        maxAge,
        secure:true, 
        sameSite:'none'
      })

      return res.status(201).json({"message" : "User created successfully.", "user" : user})
    }else{
      return res.status(400).json({"message" : "Error creating user."})
    }

}catch(e){
  return res.status(400).json({"message" : "Some backend error " + e})
}

}

const userLoginController = async(req : Request,res : Response) => {

  const {email,password} : {email : string,password : string} = req.body

  if(!email || !password){
    return res.status(400).json({"message" : "email, password are mandatory."})
  }

  const user = await UserModel.findOne({
    "email" : email
  })

  if(!user){
    return res.status(401).json({"message" : "User does not exist. Pls Signup First."})
  }

  const isPasswordCorrect : boolean = await bcrypt.compare(password,user.password)

  if(isPasswordCorrect){
    
    res.cookie("jwt",createToken(email),{
      maxAge,
      secure:true, 
      sameSite:"none"
    })

    return res.status(200).json({"message" : "Welcome", "user" : user})

  }else{
    return res.status(403).json({"message" : "Password is incorrect"})
  }

}

export {userSignupController,userLoginController}