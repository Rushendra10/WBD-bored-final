const path = require("path");
const express = require("express");
const router = express.Router();

const User = require("../Models/User");

router.get("/edit", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("edit", {user: req.session.loggeduser});
   
    }
});

router.post("/edit", (req, res) =>{

    user = req.session.loggeduser;

    // console.log(req.body);

    // user.age = req.body.age;

    // user.email = req.body.email;

    // user.password = req.body.password;

    // user.bio = req.body.bio;

    User.updateOne({email: req.body.email}, {$set: {age: req.body.age, email: req.body.email, password: req.body.password, bio: req.body.bio}});

    
    res.redirect("/");
   
});

module.exports = router;