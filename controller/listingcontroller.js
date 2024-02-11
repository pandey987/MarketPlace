const Listing = require("../models/listing");

module.exports.index= async (req, res) => {
    let alldata = await Listing.find({});
    res.render("./listing/index.ejs", { alldata });
}

module.exports.renderNew = (req, res) => {
    // console.log(req.user);// store all data of user in particular session
    res.render("./listing/new.ejs");
};

module.exports.renderShow = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");
    if (!data) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("./listing/show.ejs", { data });
};

module.exports.createNewListing = async (req, res, next) => {

    // let { title, description, price, location, country ,image} = req.body;
    // let data = new Listing({
    //     title: title,
    //     description: description,
    //     image: {url : image},
    //     price: price,
    //     location: location,
    //     country: country
    // });
    // let data = new Listing(req.body.listing);
    // await data.save();
    let data = new Listing(req.body.listing);
    data.owner = req.user._id;
    await data.save();
    req.flash("success", "New listing has been created!");
    res.redirect("/listings");

};

module.exports.renderEdit = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if (!data) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("./listing/update.ejs", { data });

};

module.exports.listingUpdate =async (req, res) => {
    let { id } = req.params;
    let list = req.body.listing;
    await Listing.findByIdAndUpdate(id, { ...list });
    req.flash("success", "Listing has been updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletelist = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing has been deleted!");
    res.redirect("/listings");
};