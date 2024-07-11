var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');

const {signout,signup,signin,isSignedIn} = require("../controllers/auth")


router.post("/signup",[
    check("name").isLength({min:3}).withMessage("Name should be atleast 3 char long"),
    check("email").isEmail().withMessage("Email is Required"),
    check("password").isLength({min:3}).withMessage("Password should be atleast 3 char")
],signup)

router.post("/signin",[
    check("email").isEmail().withMessage("Email is Required"),
    check("password").isLength({min:1}).withMessage("Password filled is required")
],signin)

router.get("/signout",signout)

// router.get("/testroute",isSignedIn,(req,res) => {
//     res.json(req.auth)
// })

module.exports = router;
