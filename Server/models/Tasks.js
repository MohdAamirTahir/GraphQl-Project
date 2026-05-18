const mongoose = require("mongoose")
const { type } = require("node:os")

const TaskSchema = new mongoose.Schema({
    title:{
      type:String
    },
    description:{
      type:String
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
})
module.exports = mongoose.model("Task",TaskSchema)