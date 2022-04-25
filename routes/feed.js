const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

router.get("/feed", async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        const posts = await Post.find({});

        res.render("feed1", {posts: posts, user: req.session.loggeduser});

        // res.sendFile(path.join(__dirname, '..', 'views', 'feed1.html'));

    }
});


router.post("/feed", async (req, res) => {

    console.log(req.body);

    await Post.find({$or: [{postcategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {

        if (docs!=null){

            console.log(docs.length);

            res.render("feed1", {posts: docs, user: req.session.loggeduser});
        }
    }).clone().catch(function(err){ console.log(err)});

});


module.exports = router;