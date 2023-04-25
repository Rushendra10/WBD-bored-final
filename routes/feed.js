const path = require("path");
const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

const redis = require('redis');
const { DEFAULT_ECDH_CURVE } = require("tls");


/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Gets all the posts of the specific category that the user has chosen
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:  
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
    
router.get("/feed", async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        const posts = await Post.find({});

        res.render("feed1", {posts: posts, user: req.session.loggeduser});

        // res.sendFile(path.join(__dirname, '..', 'views', 'feed1.html'));

    }
    
    // console.log("haha");
});



// const redisClient = redis.createClient("redis://red-ch3fcrceoogsn02sg3b0:6379")
const redisClient = redis.createClient()

router.post("/feed", async (req, res) => {

    // console.log(req.body.category);

    redisClient.get("posts", async (error, posts) => {

        if (error){
            console.log(error);
        }

        if (posts!=null){
            
            let x = JSON.parse(posts);

            // console.log(x);

            let flag=0;

            for (let i=0; i<x.length; i++){

                if (x[0].postCategory!=req.body.category){
                    flag=1;
                    break;
                }
            }

            if (flag==0){
                console.log("Redis Cache Hit");

                res.render("feed1", {posts: x, user: req.session.loggeduser});
            }

            else {
                console.log("Redis Cache Miss");   
                
                data = await Post.find({$or: [{postCategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {
                    // await Post.find({newcategoryname: "Movies"}, {}, (err, docs) => {
                    if (docs!=null){
                        
                        posts = null;
                        redisClient.setex("posts", 10, JSON.stringify(docs))
                        res.render("feed1", {posts: docs, user: req.session.loggeduser});
                        
                    }
                }).clone().catch(function(err){ console.log(err)});
            }
            
        }

        else {

            console.log("Redis Cache Miss");

            data = await Post.find({$or: [{postCategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {
                // await Post.find({newcategoryname: "Movies"}, {}, (err, docs) => {
                if (docs!=null){
        
                    // console.log(docs.length);
        
                    // console.log(docs[0]);

                    redisClient.setex("posts", 10, JSON.stringify(docs))
                    res.render("feed1", {posts: docs, user: req.session.loggeduser});
                    
        
                    
                }
            }).clone().catch(function(err){ console.log(err)});

            

            

            // posts = null
        }
    })

    // await Post.find({$or: [{postCategory: req.body.category}, {newcategoryname: req.body.category}]}, (err, docs) => {
    //     // await Post.find({newcategoryname: "Movies"}, {}, (err, docs) => {
    //     if (docs!=null){

    //         // console.log(docs.length);

    //         // console.log(docs[0]); 

    //         res.render("feed1", {posts: docs , user: req.session.loggeduser});
    //     }
    // }).clone().catch(function(err){ console.log(err)});
    

    // console.log("in post");

});


module.exports = router;