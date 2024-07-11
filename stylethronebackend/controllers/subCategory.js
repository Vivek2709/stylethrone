const SubCategory = require("../models/subCategory")

exports.getSubCategoryById = (req,res,next,id) => {
    SubCategory.findById(id).exec((err,subcate) => {
        if(err){
            return res.status(400).json({
                error: "SubCategory not found in DB"
            })
        }
        req.subcategory = subcate
        next()
    })
}

exports.createSubCategory = (req,res) => {
    const subcategory = new SubCategory(req.body);
    subcategory.save((err,subcategory) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save subcategory in DB"
            })
        }
        res.json({subcategory})
    })
}

exports.getSubCategory = (req,res) => {
    return res.json(req.subcategory)
}

exports.getAllSubCategory = (req,res) => {
    SubCategory.find().exec((err,subcategories) => {
        if(err){
            return res.status(400).json({
                error: "NO SubCategories Found"
            })
        }
        res.json(subcategories);
    })
}
// exports.updateCategory = (req,res) => {
//     Category.findByIdAndUpdate(
//         {_id: req.category._id},
//         {$set:req.body},
//         {new:true,useFindAndModify:false},
//         (err,updatedCategory) => {
//             if(err){
//                 return res.status(400).json({
//                     error: "Failed to update category"
//                 })
//                 }
//             res.json(updatedCategory)
//         }
//     )
// }
exports.updateSubCategory = (req,res) => {
    const subcategory = req.subcategory;
    //console.log(req.body)
    subcategory.name = req.body.name;
    subcategory.save((err,updatedSubCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update SubCategory"
            })
        }
        res.json(updatedSubCategory)
    })
}

exports.removeSubCategory = (req,res) => {
    const subcategory = req.subcategory;
    subcategory.remove((err,subcategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this SubCategory"
            })
        }
        res.json({
            message: `Successful deleted ${subcategory}`
        })
    })
}