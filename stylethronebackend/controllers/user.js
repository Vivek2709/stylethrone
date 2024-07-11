const User = require("../models/user")
const Order = require("../models/order")



exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was find in DB"
            })
        }
        req.profile = user
        next();
    })
}

exports.getUser = (req,res) => {
    //** we are just undefining this information in user's profile not in actual DB */
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true,useFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(40).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name email")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error: "No Order In This Account"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            stylenote: product.stylenote,
            size: product.size,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    next()


//** store this in DB */
User.findOneAndUpdate(
    { _id: req.profile._id},
    {$push: {purchases: purchases}},
    {new:true},
    (err, purchases) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save purchase list"
            })
        }
    next()
    }
)
}
//**method that can get all the users from DB */
// exports.getAllUsers = (req,res) => {
//     User.find().exec((err,users) => {
//         if(err || !users){
//             return res.status(400).json({
//                 error: "No users found"
//             })
//         }
//         res.json(users)
//     })
// }