var express = require("express");
var router = express.Router();

const Buyer = require("../models/buyer.details");

router.get("/getall", function(req, res) {
    console.log(req.body);
    Buyer.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        Name: req.body.Name,
      Email: req.body.Email,
      Contact_Number: req.body.Contact_Number,
      Age: req.body.Age,
      type: req.body.type,
      Batch_Name: req.body.Batch_Name,
      password: req.body.password,
        
    });

    Buyer.findOne({Email: req.body.Email}).then(user => {
        if(!user){
            
            Vendor.findOne({Email: req.body.Email}).then(vendor => {
            
                if(!vendor){
           console.log("adding new buyer");
           newBuyer.save()
                .then(newBuyer=>{
                    res.status(200).json(newBuyer);
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
    const newBuyer = new Buyer({
        Name: req.body.Name,
      Email: req.body.Email,
      Contact_Number: req.body.Contact_Number,
      Age: req.body.Age,
      type: req.body.type,
      Batch_Name: req.body.Batch_Name,
      password: req.body.password,
        
    });

   Buyer.findOne({Email:req.body.Email}).then(
       user => {
           user.Name = req.body.Name,
           
           user.Contact_Number = req.body.Contact_Number,
           user.Age = req.body.Age,
           user.password = req.body.password,
           user.Batch_Name = req.body.Batch_Name,
           user.type = req.body.type

           user.save()
           .then(()=>res.json('result updated' + user))
           .catch((err => res.status(400).json('Error' + err)))

       }
   ).catch((err => res.status(400).json('Error'+err)))

 
});

module.exports = router;
