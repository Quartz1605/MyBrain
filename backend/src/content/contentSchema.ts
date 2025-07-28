import mongoose from "mongoose";

const Schema = mongoose.Schema

const ObjectId = mongoose.SchemaTypes.ObjectId


const ContentSchema = new Schema({

  link : {
    type : String,
    required : true,
  },

  type : {
    type : String,
    enum : ['image','video','article','audio']
  },

  title : {
    type : String,
    required : true
  },

  description : {
    type : String
  },


  tags : [{
    type : ObjectId,
    ref : 'tags'
  }],

  tagName : [{
    type : String,
    required : true
  }],

  userId : {
    type : ObjectId,
    ref : 'users'
  }

})



const ContentModel = mongoose.model("content",ContentSchema)

export {ContentModel}