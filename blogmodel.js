const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    blogId : Number,
    name:String,
    description:String,
    category:String,
    image:String
})
module.exports = mongoose.model("blog",blogSchema)