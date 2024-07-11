require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors =  require("cors")

//routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const subCategoryRoutes = require("./routes/subCategory")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const brandRoutes = require("./routes/brand")
const stripeRoutes = require("./routes/stripepayment")






//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
})

//Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",subCategoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",brandRoutes)
app.use("/api",stripeRoutes)







//PORT
const port = process.env.PORT || 8000;


//Starting Server
app.listen(port, () => {
    console.log(`App Is Running at ${port}`)
})