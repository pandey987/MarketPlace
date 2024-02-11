const User = require("../models/user.js");

module.exports.userSighup = async (req, res) => {
    try {
        let { name, username, email, password } = req.body;
        const newuser = new User({ email, name, username });
        const registeredUser = await User.register(newuser, password);
        // console.log(registeredUser);
        // console.log(req.user);
        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to WoderLust!");
            let redirectUrl = res.locals.redirectUrl || "/listings";//because some time islogged in will not be called
            res.redirect(redirectUrl);
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/sighup");
    }

};

module.exports.renderLogin = (req, res) => {
    res.render("./user/login.ejs");
};

module.exports.userLogin = async (req, res) => {
    req.flash("success", "Welcome back to WonderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings"// for user experiance
    console.log(redirectUrl);
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
    req.logout((e) => {
        if (e) {
            return next(e);
        }
        req.flash("success", "you are logged out successfully!");
        res.redirect("/listings");
    });
};

module.exports.renderSighUp =(req, res) => {
    res.render("./user/sighup.ejs");
};