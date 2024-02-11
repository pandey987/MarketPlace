const express = require("express");
const router = express.Router();

// for post
//index
router.get("" , (req,res) =>{
    res.send("this is index for post");
});

//show
router.get("/:id", (req,res) =>{
    res.send("this is show for post");
});

//show
router.delete("/:id", (req,res) =>{
    res.send("this is delete for post");
});

//user updata
router.post("", (req,res) =>{
    res.send("this is post updata");
});

module.exports = router;