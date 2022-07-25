var express = require("express");
var router = express.Router();

const Total = require("../models/total.details");

router.get("/getall", function (req, res) {
    console.log(req.body);
    Total.find(function (err, totals) {
        if (err) {
            console.log(err);
        } else {
            res.json(totals);
        }
    })
});

router.route('/condition').post((req,res) => {
    
    Total.find({Email: req.body.Email, Item_Name: req.body.Item_Name})
    .then(totals => res.json(totals))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/top5').get((req,res) => {
    
    Total.find().limit(5).sort({Total_Sold: -1})
    .then(totals => res.json(totals))
    .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/add').post((req, res) => {

   
    const Email = req.body.Email
  const Item_Name = req.body.Item_Name
  const Total_Sold = req.body.Total_Sold

    const newTotal = new Total({
        Item_Name,        
        Email,
        Total_Sold

    })

    newTotal.save()
        .then(totals => res.status(200).json(totals))
        .catch(err => res.status(400).json('Error :' + err))

});


router.post("/update", (req, res) => {

    const newTotal = new Total({
        
      Email: req.body.Email,
      Item_Name: req.body.Item_Name,
      Total_Sold: req.body.Total_Sold
        
    });

   
   Total.findOne({Email:req.body.Email, Item_Name: req.body.Item_Name}).then(
       totals => {
           totals.Email= req.body.Email,
           totals.Amount= req.body.Amount,
           totals.Total_Sold = req.body.Total_Sold
        
           
           totals.save()
           .then(()=>res.json('result updated' + totals))
           .catch((err => res.status(400).json('Error' + err)))
        

       }
   ).catch((err => res.status(400).json('Error'+err)))
       
    
 
});


module.exports = router;
