const express = require("express")
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin,isBrandAdmin,isDeliveryBoy} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
//TODO: BRAND ROUTE
const {updateStock} = require("../controllers/product")
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")

//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//Actual Routes
//Create
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//first we push order into user's purchaselist than we update stock and if both method executed succesfully than we'll create order in db and if err occurs than we can find out err from that 2 methods

//read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders) //TODO: delivery boy

//status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)
module.exports = router