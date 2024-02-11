const Listing = require("../models/listing");
const Review = require("../models/review.js");

module.exports.creatingReview = async(req,res) =>{
    let { id } = req.params;
    // let {rev}= req.body.review;
    console.log(id);
    let listing = await Listing.findById(id);
    let newrev = new Review(req.body.review);
    newrev.author = req.user._id;
    listing.reviews.push(newrev);
    console.log(newrev);
    const data = await newrev.save();
    await listing.save();
    req.flash("success","New review has been created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deletingReview =  async(req,res) => {
    let {id, id_rev} = req.params;
    await Review.findByIdAndDelete(id_rev);
    await Listing.findByIdAndUpdate(id,{$pull :{reviews : id_rev}});
    req.flash("success","Review has been deleted!");
    res.redirect(`/listings/${id}`);
};