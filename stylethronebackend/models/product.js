const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required:true,
        maxlength:35
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:500
    },
    price: {
        type: Number,
        required:true,
        maxlength: 30,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    sub_category:{
        type:ObjectId,
        ref:"SubCategory",
        required:true
    },
    brand:{
        type:ObjectId,
        ref: "Brand",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    size:{
        type:String
    },
    lower_size:{
        type:Number
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    style_note:{
        type:String,
        maxlength:200
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)