var express = require("express");
var router = express.Router();

const Vendor = require("../models/vendor.details");

router.get("/getall", function(req, res) {
    console.log(req.body);
    Vendor.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
		Managers_Name: req.body.Managers_Name,
      Email: req.body.Email,
      Contact_Number: req.body.Contact_Number,
      type:req.body.type,
      password: req.body.password,
	  Closing_Time: req.body.Closing_Time,
      Opening_Time: req.body.Opening_Time,   
	  Shop_Name: req.body.Shop_Name, 
	  type: req.body.type,    
        
    });
    Vendor.findOne({Email: req.body.Email}).then(user => {
        if(!user){
            
            Buyer.findOne({Email: req.body.Email}).then(buyer => {
            
                if(!buyer){
           console.log("adding new vendor");
           newVendor.save()
                .then(newVendor=>{
                    res.status(200).json(newVendor);
                })
                .catch(err=>{
                    res.status(400).json(err);
                });
            }
             
            else {
                
                    console.log("Already registered");
                        res.status(200).json({status:"Already registered",});
                
            }

        }
            )
        }
        else {
            console.log("Already registered");
                res.status(200).json({status:"Already registered",});
        }
    })

   
});

router.post("/update", (req, res) => {
    const newVendor = new Vendor({
        Managers_Name: req.body.Managers_Name,
        Email: req.body.Email,
        Contact_Number: req.body.Contact_Number,
        type:req.body.type,
        password: req.body.password,
        Closing_Time: req.body.Closing_Time,
        Opening_Time: req.body.Opening_Time,   
        Shop_Name: req.body.Shop_Name, 
        type: req.body.type,  
    });

   Vendor.findOne({Email:req.body.Email}).then(
       user => {
        user.Managers_Name= req.body.Managers_Name,
        
        user.Contact_Number= req.body.Contact_Number,
        user.type=req.body.type,
        user.password= req.body.password,
        user.Closing_Time= req.body.Closing_Time,
        user.Opening_Time= req.body.Opening_Time,   
        user.Shop_Name= req.body.Shop_Name, 
        user.type= req.body.type,  

           user.save()
           .then(()=>res.json('result updated' + user))
           .catch((err => res.status(400).json('Error' + err)))

       }
   ).catch((err => res.status(400).json('Error'+err)))

 
});

module.exports = router;