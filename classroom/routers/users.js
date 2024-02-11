const express = require("express");
const router = express.Router();

//index
router.get("" , (req,res) =>{
    res.send("this is index for users");
});

//show
router.get("/:id", (req,res) =>{
    res.send("this is show for user");
});

//show
router.delete("/:id", (req,res) =>{
    res.send("this is delete for user");
});

//user updata
router.post("", (req,res) =>{
    res.send("this is user updata");
});

module.exports = router;