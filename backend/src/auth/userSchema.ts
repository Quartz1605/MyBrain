import mongoose from "mongoose";


const Schema = mongoose.Schema

const ObjectId = mongoose.SchemaTypes.ObjectId


const UserSchema = new Schema({

  email : {
    type : String,
    unique : true,
    required : [true, "email is required"]
  },

  password : {
    type : String,
    required : [true, "password is required"]
  },

  firstName : {
    type : String,
  },

  lastName : {
    type : String,
  },


})

const UserModel = mongoose.model("users",UserSchema)

export {UserModel}