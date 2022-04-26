const path = require("path");
const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.post("/deleteUser", async (req, res) =>{

    console.log(req.body);
   
    await User.deleteOne({profilePicture: req.body.userid}, (err, docs) => {

    }).clone().catch(function(err){ console.log(err)});

    res.redirect("/userAdmin");
});

module.exports = router;