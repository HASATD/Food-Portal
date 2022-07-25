const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorSchema = new Schema ({
    Managers_Name : {
        type: String,
        required: true,
        trim: true,
        minlength: true,
        unique: false
    },
    Shop_Name: {
       
        type: String,
        required: true,
        trim: true,
        minlength: true,
        unique: true

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
    Opening_Time:{
        type : String,
        required: true
       
    },
    Closing_Time: {
        type : String,
        required: true 
        
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    }

    


},{
    timestamps: true,
}

)
module.exports = Vendor = mongoose.model("Vendors", vendorSchema);