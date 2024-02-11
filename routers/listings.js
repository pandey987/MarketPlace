const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const asyncWrap = require("../utils/asynwrap.js")
const Expresserror = require("../utils/expressErr.js")
const { isloggedin, isThisOwner, validateList } = require("../middleware.js");
const { index, renderNew, renderShow, createNewListing, renderEdit, listingUpdate, deleteListing } = require("../controller/listingcontroller.js");

// index route// create route
router.route("")
.get( asyncWrap(index))
.post(validateList, isloggedin, asyncWrap(createNewListing));

// new route
router.get("/new", isloggedin, renderNew);

// show route //updating // delete route
router.route("/:id")
.get( asyncWrap(renderShow))
.put(isloggedin, isThisOwner, validateList, asyncWrap(listingUpdate))
.delete(isloggedin, isThisOwner, asyncWrap(deleteListing));

// Edit route
router.get("/:id/edit", isloggedin, isThisOwner, asyncWrap(renderEdit));

module.exports = router;