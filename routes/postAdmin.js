const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

router.get("/postAdmin", async (req, res) =>{

    if (req.session.loggeduser.email!="rushendra910@gmail.com" || req.session.loggeduser.password!="123456789"){

        res.redirect("/login");
    }

    else {

        await Post.find({}, (err, docs)  => {

            res.render("postAdmin", {user: req.session.loggeduser, posts:docs});
            
        }).clone().catch(function(err){ console.log(err)});
    }

   
});

module.exports = router;