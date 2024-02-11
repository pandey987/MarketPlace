const express = require("express");
const asynwrap = require("../utils/asynwrap");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { userSighup, renderLogin, userLogin, userLogout, renderSighUp } = require("../controller/usercontroller.js");
const router = express.Router({ mergeParams: true });

router.route("/sighup")
.get(renderSighUp)
.post(saveRedirectUrl, asynwrap(userSighup))

router.route("/login")
.get(renderLogin)
.post( saveRedirectUrl, passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}),userLogin );


router.get("/logout", userLogout);

module.exports = router;