const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { sortBy } = require("lodash")
//const { options } = require("../routes/product")


exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .populate("subcategory")
    //TODO: 
    .populate("brand")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next();
    })
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req,(err,fields,file) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        //destructure the fields
        //const {name,description,price,category,sub_category,stock,size,lower_size,style_note} = fields\
        const {name,description,price,category,sub_category,stock,size,lower_size,style_note,brand} = fields
        //console.log(fields)
        //TODO:
        if(!name || !description || !price || !category || !sub_category || !stock || !brand || !(size || lower_size))
        {
            //console.log(photo)
            console.log(fields)
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        let product = new Product(fields)
        //handle files
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to the DB
        product.save((err,product) => {
            if(err){
                return res.status(400).json({
                    error: "Saving Product in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}
//safety purpose
//middleware
exports.photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req,(err,fields,file) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        //updation code
        let product = req.product
        product = _.extend(product,fields)
        //handle files
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to the DB
        product.save((err,product) => {
            if(err){
                return res.status(400).json({
                    error: "Updation of Product in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete ${deletedProduct}`
            })
        }
        res.json({
            message: "Deletion was a success",
            deletedProduct
        })
    })
}
//product lising
exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        //TODO: 
        //.populate("brand")
        .populate("subcategory")
        .sort([[sortBy,"asc"]])
        .limit(limit)
        .exec((err,products) => {
            if(err){
                return res.status(400).json({
                    error: "NO product FOUND"
                })
            }
            res.json(products)
        })
}
exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category)
    })
}
exports.getAllUniqueSubCategories = (req,res) => {
    Product.distinct("subcategory",{},(err,subcategory) => {
        if(err){
            return res.status(400).json({
                error: "No SubCategory Found"
            })
        }
        res.json(subcategory)
    })
}
//middleware to update inventory
exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err,products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk Operation failed"
            })
        }
        next()
    })
}
