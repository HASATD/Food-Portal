var express = require("express");
var router = express.Router();

const Food = require("../models/food.details")

router.route('/').get((req,res) => {
    Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/condition').post((req,res) => {
    
    Food.find({Email: req.body.Email})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/lowprice').get((req,res) => {
    
    Food.find().sort({Price: 1})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/highprice').get((req,res) => {
    
    Food.find().sort({Price: -1})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/highrate').get((req,res) => {
    
    Food.find().sort({Rating: -1})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/lowrate').get((req,res) => {
    
    Food.find().sort({Rating: 1})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/fooditem').post((req,res) => {
    
    Food.find({Item_Name: req.body.Item_Name})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/type').post((req,res) => {
    
    Food.find({Type: req.body.Type})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/oneitem').post((req,res) => {
    
    Food.find({Email: req.body.Email,Item_Name: req.body.Item_Name})
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {

      const Item_Name = req.body.Item_Name
      const Price = req.body.Price
      const Rating = req.body.Rating
      const Type = req.body.Type
      const Tags = req.body.Tags
      const Addons = req.body.Addons
      const Email = req.body.Email
      const Managers_Name = req.body.Managers_Name
      

      const newFood = new Food({
          Item_Name,
          Price,
          Rating,
          Type,
          Tags,
          Addons,
          Email,
          Managers_Name
          
      })

      newFood.save()
      .then(foods => res.status(200).json(foods))
      .catch(err => res.status(400).json('Error :' + err))

});

router.route('/:id').get((req,res) => {
    Food.findById(req.params.id)
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').delete((req,res) => {
    Food.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/update/:id').post((req,res) => {
    Food.findById(req.params.id)
    .then(foods => {
        foods.Item_Name = req.body.Item_Name,
        foods.Price = req.body.Price,
        foods.Rating = req.body.Rating,
        foods.Type = req.body.Type,
        foods.Tags = req.body.Tags,
        foods.Addons= req.body.Addons,
       
        
        foods.save()
        .then(() => res.json("Food item updated"))
        .catch(err => res.status(400).json('Error: '+ err))
           

    })
    .catch(err => res.status(400).json("Error: "+ err))
});

router.post("/update", (req, res) => {
       
   Food.findOne({Email:req.body.Email, Item_Name: req.body.Item_Name}).then(
       foods => {
        foods.Item_Name = req.body.Item_Name,
        foods.Price = req.body.Price,
        foods.Rating = req.body.Rating,
        foods.Type = req.body.Type,
        foods.Tags = req.body.Tags,
        foods.Addons= req.body.Addons,
        foods.Managers_Name = req.body.Managers_Name
           
           foods.save()
           .then(()=>res.json('result updated' + foods))
           .catch((err => res.status(400).json('Error' + err)))
        

       }
   ).catch((err => res.status(400).json('Error'+err)))
       
    
 
});
module.exports = router;

