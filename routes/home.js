const path = require("path");
const express = require("express");
const fs = require('fs')

const router = express.Router();

const User = require("../Models/User");
const session = require("express-session");
const Post = require("../Models/Post");

router.get("/", async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        let user = req.session.loggeduser;

        console.log("the one I need", user);

        

        // const folderPath = '/Images';

        // console.log(fs.readdirSync(folderPath)); 

        let arr = []

        await Post.find({postCategory: "other"}, (err, docs) => {

            if (docs!=null){

                for(let i=0; i<docs.length; i++){

                    arr.push(docs[i]);
                }

                // console.log(docs.length);

                // console.log(arr.length);
        
                res.render("index", {user: user, specialposts: arr});
            }

            else {
                res.render("index", {user:user});
            }

            // console.log(docs[0]);
        }).clone().catch(function(err){ console.log(err)});

        // console.log(specialposts);

        // res.render("index", {user:user});
    }
   
});

module.exports = router;
