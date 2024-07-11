const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    proudcts:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number,
    size:String,
    category:{
        type:ObjectId,
        ref:"Category"
    },
    subCategory:{
        type:ObjectId,
        ref:"SubCategory"
    }    
})
const ProductCart = mongoose.model("ProductCart",ProductCartSchema)

const OrderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id: {},
    amount: {type:Number},
    address:String,
    status : {
        type:String,
        default: "Recieved",
        enum: ["Cancelled","Delivered","Shipped","Processing","Recieved"],
    },
    updated: Date,
    user: {
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Order = mongoose.model("Order",OrderSchema)

module.exports = {Order,ProductCart}



