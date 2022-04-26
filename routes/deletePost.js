const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

router.post("/deletePost", async (req, res) =>{

    console.log(req.body);
   
    await Post.deleteOne({postImg: req.body.postid}, (err, docs) => {

    }).clone().catch(function(err){ console.log(err)});

    res.redirect("/postAdmin");
});

module.exports = router;