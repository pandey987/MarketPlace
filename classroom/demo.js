const express = require("express");
const app = express();
const user = require("./routers/users.js");
const post = require("./routers/posts.js");

app.get("/" , (req,res) =>{
    res.send("this is home page");
});
app.use("/users", user);
app.use("/post", post);

app.listen(3000, () =>{
    console.log("app is listing to port 3000");
});

