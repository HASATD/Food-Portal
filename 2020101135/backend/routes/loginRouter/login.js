const express = require("express")
var router = express.Router();



const Buyer = require("../../models/buyer.details")
const Vendor = require("../../models/vendor.details")
router.post("/", (req, res) => {
    const Email = req.body.Email;
    const password = req.body.password;
   // const pass = req.body.pass;
   

Buyer.findOne({ Email,password }).then(buyers => {
    if (!buyers) {
        Vendor.findOne({ Email,password }).then(vendors => {
            if (!vendors) {
                res.status(200).json("Error: user not found")
                
            }
            else {
                res.status(200).json(vendors);
            }
        })
    }
    else {
        res.status(200).json(buyers);
    }
})
})




//exporting Router that is created
module.exports = router;