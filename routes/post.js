const path = require("path");
const express = require("express");
const router = express.Router();

const fs = require('fs');

const Post = require("../Models/Post");
const { redirect } = require("express/lib/response");
const { equal } = require("assert");

const multer = require("multer");

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {

        let path = "./public/uploads";
        cb(null, path);
    },

    filename: (req, file, cb) => {

        console.log(file)

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get("/post", async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        await Post.distinct("newcategoryname", (err, docs) => {

            if (docs!=null){

                console.log(docs);

                res.render("post", {user:req.session.loggeduser, cats: docs})
            }

            else {
                res.render("post", {user:req.session.loggeduser});
            }

        }).clone().catch(function(err){ console.log(err)});

    }
    
});

// router.post("/post", upload.single("postimage"), upload.single("newcategorypic") , (req, res) => {

    router.post("/post", upload.fields([{
        name: 'postimage', maxCount: 1
      }, {
        name: 'newcategorypic', maxCount: 1
      }]), function(req, res, next){

    console.log(req.files);
    // console.log(req.files.length);

    // console.log(req.body.postimage);

    // console.log(req.file);

    let newPost;

    if (req.files.newcategorypic==undefined){

        newPost = new Post({

            postDate: Date.now(),
    
            postTitle: req.body.posttitle,
        
            postContent: req.body.postcontent,
        
            // postImg: req.files.filename,
            postImg: req.files.postimage[0].filename,
    
            newcategoryname: req.body.newcategoryname,
    
            // newcategoryImg: req.files.newcategorypic[0].filename,
    
            postCategory: req.body.category,
    
        })

    }
    

    else {
        newPost = new Post({

            postDate: Date.now(),
    
            postTitle: req.body.posttitle,
        
            postContent: req.body.postcontent,
        
            // postImg: req.files.filename,
            postImg: req.files.postimage[0].filename,
    
            newcategoryname: req.body.newcategoryname,
    
            newcategoryImg: req.files.newcategorypic[0].filename,
    
            postCategory: req.body.category,
    
        })
    }

    Post.savePost(newPost);

    console.log(newPost);

    // res.render("index", {user: req.session.loggeduser});

    req.session.loggeduser.posts.push(newPost);

    res.redirect("/");
});
    
    


module.exports = router;
