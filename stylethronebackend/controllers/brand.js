const Brand = require("../models/brand")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { sortBy } = require("lodash")

exports.getBrandById = (req,res,next,id) => {
    Product.findById(id)
    //TODO:
    .exec((err,brand) => {
        if(err){
            return res.status(400).json({
                error: "Brand Not Found"
            })
        }
        req.brand = brand
        next();
    })
}

exports.createBrand = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        //TODO: 
        const {brand_logo,admin_name,brand_name} = fields;
        if(!brand_name || !admin_name){
            console.log(fields)
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        let brand = new Brand(fields)
        //handle files
        if(file.brand_logo){
            if(file.brand_logo.size > 3000000){
                return res.status(400).json({
                    error: "File size is too big"
                })
            }
            brand.brand_logo.data = fs.readFileSync(file.brand_logo.path)
            brand.brand_logo.contentType = file.brand_logo.type
        }
        //save to the db
        brand.save((err,brand) => {
            if(err){
                res.status(400).json({
                    error:"Saving Brand in DB Failed "
                })
            }
            res.json(brand)
        })
    })
}

exports.getBrand = (req,res) => {
    req.brand.brand_logo = undefined
    return res.json(req.brand)
}

exports.brand_logo = (req,res,next) => {
    if(req.product.brand_logo.data){
        res.set("Content-Type",req.brand.brand_logo.contentType)
        return res.send(req.brand.brand_logo.data)
    }
    next()
}

exports.deleteBrand = (req,res) => {
    let brand = req.brand;
    brand.remove((err,deletedbrand) => {
        if(err){
            return res.status(400).json({
                error: "Failed To Delete the brand"
            })
        }
        res.json({
            message: "Deletion was a success",
            deletedbrand
        })
    })
}

exports.updateBrand = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        let brand = req.brand;
        brand = _.extend(brand,fields)
        //handle files
        if(file.brand_logo){
            if(file.brand_logo.size > 3000000){
                return res.status(400).json({
                    error: "File size is too big"
                })
            }
            brand.brand_logo.data = fs.readFileSync(file.brand_logo.path)
            brand.brand_logo.contentType = file.brand_logo.type
        }
        //save to the db
        brand.save((err,brand) => {
            if(err){
                res.status(400).json({
                    error:"Updation of Product Failed"
                })
            }
            res.json(brand)
        })
    })
}

exports.getAllBrands = (req,res) => {
    Brand.find().exec((err,brands) => {
        if(err){
            return res.status(400).json({
                error: "NO Brands Found"
            })
        }
        res.json(brands);
    })
}

exports.getAllUniqueProducts = (req,res) => {
    Brand.distinct("product",{},(err,prodcut) => {
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(prodcut)
    })
}
