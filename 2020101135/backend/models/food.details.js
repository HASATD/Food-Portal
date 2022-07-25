const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema ({

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
    Email: {
        type: String,
        required: true,
    },
    Managers_Name: {
        type: String,
        required: true,
    }



},{
    timestamps: true,
}
)

module.exports = Food = mongoose.model("Food", foodSchema);


