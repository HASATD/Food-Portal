var express = require("express");
var router = express.Router();

const Order = require("../models/orders.details")

router.route('/').get((req,res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/buyerorders').post((req,res) => {
    
    Order.find({Buyer_Email: req.body.Buyer_Email})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/vendororders').post((req,res) => {
    
    Order.find({Vendor_Email: req.body.Vendor_Email})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/placed').post((req,res) => {
    
    Order.find({Vendor_Email: req.body.Vendor_Email}).count()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/completed').post((req,res) => {
    
    Order.find({Vendor_Email: req.body.Vendor_Email,Status: "COMPLETED"}).count()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/pending').post((req,res) => {
    
    Order.find({Vendor_Email: req.body.Vendor_Email,$or:[{Status: "ACCEPTED"},{Status: "COOKING"},{Status: "READY FOR PICKUP"}]}).count()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/ongoing').post((req,res) => {
    
    Order.find({Vendor_Email: req.body.Vendor_Email,$or:[{Status: "ACCEPTED"},{Status: "COOKING"}]}).count()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err))
})







router.route('/add').post((req,res) => {

    const Item_Name = req.body.Item_Name
    const Price = req.body.Price
    const Rating = req.body.Rating
    const Type = req.body.Type
    const Tags = req.body.Tags
    const Addons = req.body.Addons
    const Vendor_Email = req.body.Vendor_Email
    const Managers_Name = req.body.Managers_Name
    const Status = req.body.Status
    const Quantity = req.body.Quantity
    const Buyer_Email = req.body.Buyer_Email
    const Total_Completed = req.body.Total_Completed
    const Placed_Time =req.body.Placed_Time

    

    const newOrder = new Order({
        Item_Name,
        Price,
        Rating,
        Type,
        Tags,
        Addons,
        Vendor_Email,
        Managers_Name,
        Status,
        Quantity,
        Buyer_Email,
        Total_Completed,
        Placed_Time

        
    })

    newOrder.save()
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(400).json('Error :' + err))

});

router.route('/:id').get((req,res) => {
    Order.findById(req.params.id)
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').delete((req,res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/update/:id').post((req,res) => {
    Order.findById(req.params.id)
    .then(orders => {
        orders.Item_Name = req.body.Item_Name,
        orders.Price = req.body.Price,
        orders.Rating = req.body.Rating,
        orders.Type = req.body.Type,
        orders.Tags = req.body.Tags,
        orders.Addons= req.body.Addons
        orders.Vendor_Email = req.body.Vendor_Email,
        orders.Buyer_Email = req.body.Buyer_Email,
        orders.Managers_Name = req.body.Managers_Name,
        orders.Status = req.body.Status,
        orders.Quantity = req.body.Quantity,
        orders.Placed_Time = Date.parse(req.body.Placed_Time),
        orders.Total_Completed = req.body.Total_Completed,        
        orders.save()
        .then(() => res.json("Order item updated"))
        .catch(err => res.status(400).json('Error: '+ err))         

    })
    .catch(err => res.status(400).json("Error: "+ err))
});




module.exports = router;