const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();
    
router.get("/search", async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        

        res.render("search", {posts: [], user: req.session.loggeduser});

        // res.sendFile(path.join(__dirname, '..', 'views', 'feed1.html'));

    }
    
    // console.log("haha");
});




router.post("/search", async (req, res) => {

    console.log(req.body.search_string);

    Post.createIndex()

    const posts = await Post.find({});

    // await Post.find({$or: [{postCategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {
    //     // await Post.find({newcategoryname: "Movies"}, {}, (err, docs) => {
    //     if (docs!=null){

    //         // console.log(docs.length);

    //         // console.log(docs[0]);

    //         res.render("feed1", {posts: docs, user: req.session.loggeduser});
    //     }
    // }).clone().catch(function(err){ console.log(err)});

    // console.log("in post");

    res.render("search", {posts: [], user: req.session.loggeduser})

});


module.exports = router;