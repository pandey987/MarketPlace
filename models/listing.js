const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    image: {
            type: String,
            default: 'https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/3.jpg',
            set: (v) => v == "" ? "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/3.jpg" : v
        },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }

})

listingSchema.post("findOneAndDelete", async(data) =>{
    if(data.reviews.length){
     let result = await Review.deleteMany({_id : {$in : data.reviews}});
     console.log(result);
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;