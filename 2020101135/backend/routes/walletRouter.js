var express = require("express");
var router = express.Router();

const Wallet = require("../models/wallet.details");
router.get("/getall", function (req, res) {
    console.log(req.body);
    Wallet.find(function (err, wallets) {
        if (err) {
            console.log(err);
        } else {
            res.json(wallets);
        }
    })
});

router.route('/add').post((req, res) => {

    const Amount = req.body.Amount
    const Email = req.body.Email



    const newWallet = new Wallet({

        Amount,
        Email

    })

    newWallet.save()
        .then(wallets => res.status(200).json(wallets))
        .catch(err => res.status(400).json('Error :' + err))

});

router.route('/condition').post((req, res) => {

    Wallet.find({ Email: req.body.Email })
        .then(wallets => {res.json(wallets)
        
        console.log(wallets)})
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post("/update", (req, res) => {
    const newWallet = new Wallet({
        
      Email: req.body.Email,
      Amount: req.body.Amount
        
    });

   
   Wallet.findOne({Email:req.body.Email}).then(
       wallet => {
           wallet.Email= req.body.Email,
           wallet.Amount= req.body.Amount,
        
           
           wallet.save()
           .then(()=>res.json('result updated' + wallet))
           .catch((err => res.status(400).json('Error' + err)))
        

       }
   ).catch((err => res.status(400).json('Error'+err)))
       
    
 
});





module.exports = router;