const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({

    Item_Name: {
        type: String,
        required: true,       
    },
    Price: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },

    Type: {
        type:String,
        required: true,
    },
    Tags: {
        type: [String],
        required: true,

    },
    Addons: {
        type: [
            {
                Add_name: String,
                price : Number
            }
        ],
        required: true,
    },

    Vendor_Email: {
        type: String,
        required: true,
    },
    Managers_Name: {
        type: String,
        required: true,
    },
    Quantity:{
        type: Number,
        required: true,
    },
    Placed_Time:{
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    Buyer_Email: {
        type: String,
        required: true,
    },
    Total_Completed: {
        type: Number,
        required: true,
    }



},{
    timestamps: true,
}
)

module.exports = Order = mongoose.model("Order", orderSchema);


