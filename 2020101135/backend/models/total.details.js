const mongoose = require('mongoose')
const Schema = mongoose.Schema

const totalSchema = new Schema ({
    Item_Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Total_Sold: {
        type: Number,
        required: true,
    }

},{
    timestamps: true,
}

)
module.exports = Total = mongoose.model("Totals", totalSchema);