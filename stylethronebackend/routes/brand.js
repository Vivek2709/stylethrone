const express = require("express")
const router = express.Router();

const {getBrandById,createBrand,getBrand, brand_logo,updateBrand,deleteBrand,getAllBrands,getAllUniqueProducts} = require("../controllers/brand")
const {isSignedIn,isAuthenticated,isAdmin,isBrandAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById)
router.param("brandId",getBrandById)

//routes
router.post("/brand/create/:userId",isSignedIn,isAuthenticated,isAdmin,createBrand)

router.get("/brand/:brandId",getBrand)
router.get("/brand/photo/:brandId",brand_logo)

//delete route
router.delete("/brand/:brandId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteBrand)

//update route
router.put("/brand/:brandId/:userId",isSignedIn,isAuthenticated,isAdmin || isBrandAdmin,updateBrand)

//listing route
router.get("/brands",getAllBrands)

router.get("/brands/products",getAllUniqueProducts)


module.exports = router;
