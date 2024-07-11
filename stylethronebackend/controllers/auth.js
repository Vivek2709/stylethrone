const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signup = (req,res) => {
    const errors  = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error :errors.array()[0].msg,
                //param:error.array()[0].param
            
        })
    }
    const user = new User(req.body)
    user.save((err,user) => {
        //console.log(user)
        if(err || !user){
            return res.status(400).json({
                err: "Not able to svae user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            mobileno: user.mobile_no,
            id: user._id
        })
    })
} 

exports.signin = (req,res) => {
    const errors  = validationResult(req)
    const {email,password} = req.body
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
                //param:errors.array()[0].param
        })
    }
    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "USER Email Does Not Exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }
        //create token
        const token = jwt.sign({_id: user._id},process.env.SECRET)
        //put token
        res.cookie("token",token,{expire: new Date() + 9999})
        //send res to frontend
        const {_id,name,email,role,mobile_no} = user
        return res.json({token,user: {_id,name,email,role,mobile_no}})
    })
}

exports.signout = (req,res) => {
    res.clearCookie("token") //clear cookies from user's browser
    res.json({
        message: "User Signout successfully"
    })
}


//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})// we are not writing next() bcz expressJwt already coverd up next() in it's method

//Custom Middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}
//**status code 403 for Access denied */
//** roles Admin-1, BrandAdmin-2, DeliveryBoy-3 */
exports.isAdmin= (req,res,next) => {
    if(req.profile.role != 1){
        return res.status(403).json({
            error: "You Are Not ADMIN, Access Denied"
        })
    }
    next()
}

exports.isBrandAdmin = (req,res,next) => {
    if(req.profile.role != 2){
        return res.status(403).json({
            error: "You Are Not Brand ADMIN, Access Denied"
        })
    }
    next()
}

exports.isDeliveryBoy = (req,res,next) => {
    if(req.profile.role != 3){
        return res.status(403).json({
            error: "You Are Not DeliveryBoy, Access Denied"
        })
    }
    next()
}
