const express = require("express")
const router  = express.Router()

const {getSubCategoryById,createSubCategory,getSubCategory,getAllSubCategory,updateSubCategory,removeSubCategory} = require("../controllers/subCategory")
const {isSignedIn,isAuthenticated,isAdmin,isBrandAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//Params
router.param("userId",getUserById);
router.param("subcategoryId",getSubCategoryById)

//routes
//create
router.post("/subcategory/create/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,createSubCategory)

//read
router.get("/subcategory/:subcategoryId",getSubCategory)
router.get("/subcategories",getAllSubCategory)

//update
router.put("/subcategory/:subcategoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateSubCategory)

//delete
router.delete("/subcategory/:subcategoryId/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,removeSubCategory)



module.exports = router