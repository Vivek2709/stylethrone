const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const brandSchema = new mongoose.Schema({

    admin_name:{
        type:ObjectId,
        ref:"User"
    },
    brand_name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    brand_logo:{
        data:Buffer,
        contentType:String
    },
    /*brand_product:{
        type:ObjectId,
        ref:"Product"
    },*/
    /*product_category:{
        type:ObjectId,
        ref:"Category"
    },*/
    /*product_stock:{
        type:ObjectId,
        ref:"Product"
    },*/
    //TODO:
    /*delivery_boy:{
        type:ObjectId,
        ref:"User"
    }*/
})

module.exports= mongoose.model("Brand",brandSchema)