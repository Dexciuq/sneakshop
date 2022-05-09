const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    list: [
        {
            name: String,
            quantity: Number,
            cost: Number
        }
    ]
});

module.exports =  mongoose.model("Сart", WishlistSchema)