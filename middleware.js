const Listing = require("./models/listing.js")
const Expresserror = require("./utils/expressErr.js")
const asyncWrap = require("./utils/asynwrap.js")
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isloggedin = (req,res,next) =>{
    console.log(req.path, "mm" ,req.originalUrl );
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in to required task");
        res.redirect("/login");
    }
    console.log("YES");
    req.session.curUser = req.user._id;
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    // req.locals.redirectUrl = "/listings";
    next();
}

module.exports.isThisOwner = async(req,res,next) =>{
    let { id } = req.params;
    let listingDetail = await Listing.findById(id);
    console.log(listingDetail.owner);
    if (!listingDetail.owner.equals(res.locals.curUser._id)) {
        req.flash("error","You don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateList = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(500, errmsg);
    }
    else {
        next();
    }
};

module.exports.validatereview = (req,res,next) => {
    console.log(req.body);
    let {error} = reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        let errmsg= error.details.map((el) => el.message).join(",");
        throw new Expresserror(400, errmsg);
    }
    else{
        next();
    }
};
module.exports.isThisReviewAuthor = asyncWrap(async(req,res,next) =>{
    let { id,id_rev } = req.params;//id of listing and review
    let review = await Review.findById(id_rev);
    console.log(review);
    if (!review.author.equals(res.locals.curUser._id)) {
        req.flash("error","You don't have permission to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
});

