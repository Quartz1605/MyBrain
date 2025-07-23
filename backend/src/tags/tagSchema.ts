import mongoose from "mongoose";

const Schema = mongoose.Schema




const TagSchema = new Schema({

  title : {
    type : String
  }

})


const TagsModel = mongoose.model("tags",TagSchema)

export {TagsModel}
