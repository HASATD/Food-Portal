const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buyerSchema = new Schema ({
    Name : {
        type: String,
        required: true,
        trim: true,
        minlength: true,
        unique: false
    },

    Email : {
        type : String,
        required : true,
        minlength: true,
        unique: true,
        trim: true
    },
    Contact_Number : {
        type : String,
        required: true,
        minlength: true,
        unique: false,
        trim: true
    },
    Age : {
        type : Number,
        required: true,
        minlength: true,
        unique: false,
        trim : true
    },
    Batch_Name:{
        type : String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }




},{
    timestamps: true,
}

)
module.exports = Buyer = mongoose.model("Buyers", buyerSchema);