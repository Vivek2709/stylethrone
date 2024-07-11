const express = require("express")
const router = express.Router();

const {getProductById,createProduct,getProduct, photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories,getAllUniqueSubCategories} = require("../controllers/product")
const {isSignedIn,isAuthenticated,isAdmin,isBrandAdmin,isDeliveryBoy} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById)
router.param("productId",getProductById)

//actual routes
//Create
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,createProduct)

//read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//update
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,updateProduct)


//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,deleteProduct)

//listing route
router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)
router.get("/products/categories",getAllUniqueSubCategories)
//TODO:FOR BRAND LISTING


module.exports = router;