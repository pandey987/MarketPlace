const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap=require("../utils/asynwrap.js")
const {validatereview, isloggedin, isThisReviewAuthor} = require("../middleware.js");
const { creatingReview, deletingReview } = require("../controller/reviewcontroller.js");

// review
router.post("", isloggedin,validatereview, asyncWrap(creatingReview));

//deleting review
router.delete("/:id_rev", isloggedin ,isThisReviewAuthor, asyncWrap(deletingReview));

module.exports = router;