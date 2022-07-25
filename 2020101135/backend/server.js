const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const buyerRouter = require("./routes/buyerRoutes")
const vendorRouter = require("./routes/vendorRoutes")
const loginRouter = require("./routes/loginRouter/login")
const foodRouter = require("./routes/foodRouter")
const orderRouter = require("./routes/orderRouter")
const walletRouter = require("./routes/walletRouter")
const totalRouter = require("./routes/totalRouter")

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(function(req,res,next){
    
   res.header("Access-Control-Allow-Origin: *");
res.header("Access-Control-Allow-Credentials: true ");
res.header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
res.header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
next();
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MongoDB connection is established");
});

app.use("/buyer", buyerRouter);
app.use("/vendor", vendorRouter);
app.use("/login",loginRouter)
app.use("/food",foodRouter)
app.use("/order",orderRouter)
app.use("/wallet",walletRouter)
app.use("/total",totalRouter)


app.listen(port,() => {
    console.log(`Server is running on the port : ${port}`)
});
