const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:35
    }
},{timestamps:true})

module.exports = mongoose.model("SubCategory",subCategorySchema) 