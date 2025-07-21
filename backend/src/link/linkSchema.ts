import mongoose from "mongoose";

const Schema = mongoose.Schema

const ObjectId = mongoose.SchemaTypes.ObjectId


const LinkSchema = new Schema({

  link : {
    type : String,
    unique : true
  },

  userId : {
    type : ObjectId,
    require : true,
    ref : 'users'
  }

})


const LinkModel = mongoose.model("link",LinkSchema)

export {LinkModel}
