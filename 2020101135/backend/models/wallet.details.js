const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema({

    Amount: {
        type: Number,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    }  



}, {
    timestamps: true,
}

)
module.exports = Wallet = mongoose.model("Wallets", walletSchema);