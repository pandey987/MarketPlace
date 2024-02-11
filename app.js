if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate= require("ejs-mate");// for ejs-mate
const Expresserror = require("./utils/expressErr.js")
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");// requires the model with Passport-Local Mongoose plugged in


const listing = require("./routers/listings.js");
const review = require("./routers/reviews.js");
const user = require("./routers/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';

const dbUrl = process.env.ATLASDB_URL;
main()
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    });
async function main() {
    await mongoose.connect(dbUrl);
}

// session data storing in atlasdb
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
})

store.on("error", () =>{
    console.log("error in mongo session store", err);
})
const sessionOption ={
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized  : true,
    cookie : {
        expires : Date.now() + 10*24*60*60*1000,
        maxAge : 10*24*60*60*1000,
        httpOnly : true
    }
}
// app.get("/", (req, res) => {
//     res.send("Working");
// })
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));//for sighin and sighup

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.islogged = req.user;
    res.locals.curUser = req.user;
    next();
});

// app.get("/demo", async(req,res) =>{
//     const demouser = new User({
//         username : "pr0",
//         name : "prakash",
//         email : "123@gmail.com"
//     });
//     let registerUser = await User.register(demouser,"hello");
//     res.send(registerUser);
//  })
app.use("/listings", listing);// for readability we are using router
app.use("/listings/:id/review", review);
app.use("/", user);

app.all("*",(req,res,next) =>{
    next(new Expresserror(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
})
app.listen(8080, () => {
    console.log("server is listening at port 8080");
})
