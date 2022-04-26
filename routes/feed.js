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


    console.log("haha");
});


router.post("/feed", async (req, res) => {

    console.log(req.body.category);

    await Post.find({$or: [{postCategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {
        // await Post.find({newcategoryname: "Movies"}, {}, (err, docs) => {
        if (docs!=null){

            // console.log(docs.length);

            // console.log(docs[0]);

            res.render("feed1", {posts: docs, user: req.session.loggeduser});
        }
    }).clone().catch(function(err){ console.log(err)});

    console.log("in post");

});


module.exports = router;