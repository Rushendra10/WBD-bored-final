const Post = require("../Models/Post");
const axios = require('axios');

const getPost = async (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        let user = req.session.loggeduser;


        let arr = []

        await Post.find({postCategory: "other"}, (err, docs) => {

            if (docs!=null){

                for(let i=0; i<docs.length; i++){

                    arr.push(docs[i]);
                }

                // console.log(docs.length);

                // console.log(arr.length);

//                 axios.get('http://localhost:5000/').then(response => {

//                     console.log(response.data);

//                 }).catch(error => {
//                     console.log(error);
//                 })
        
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
   
}


const deletePost = async (req, res) =>{

    console.log(req.body);
   
    await Post.deleteOne({postImg: req.body.postid}, (err, docs) => {

    }).clone().catch(function(err){ console.log(err)});

    res.redirect("/postAdmin");
}


const checkAdminPost = async (req, res) =>{

    if (req.session.loggeduser.email!="rush910@gmail.com"){

        res.redirect("/oops");
    }

    else {

        await Post.find({}, (err, docs)  => {

            res.render("postAdmin", {user: req.session.loggeduser, posts:docs});
            
        }).clone().catch(function(err){ console.log(err)});
    }

   
}

module.exports = {getPost, deletePost, checkAdminPost}