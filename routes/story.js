const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

const axios = require('axios');

router.get("/story", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("story", {user: req.session.loggeduser});
    }
});

router.post("/story", async (req, res) => {

    // console.log(req.body);

    // let post

    // await axios.post("http://localhost:5000/story", req.body).then((response) => {
    //     console.log(response.data.post)

    //     post = response.data.post

    //     res.render("story", {post:response.data.post, user:req.session.loggeduser});
        
    // })

    

    console.log(req.body.postid);

    let post

    await Post.findOne({postImg: req.body.postid}, (err, docs) => {

        if (docs!=null){

            post = docs;
        }

        else {

            console.log("PROBLEM");
        }
    }).clone().catch(function(err){ console.log(err)})

    res.render("story", {post:post, user:req.session.loggeduser});
    
})

module.exports = router;