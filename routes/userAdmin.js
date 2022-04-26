const path = require("path");
const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.get("/userAdmin", async (req, res) =>{

    if (req.session.loggeduser.email!="rushendra910@gmail.com" || req.session.loggeduser.password!="123456789"){

        res.redirect("/login");
    }

    else {

        await User.find({}, (err, docs)  => {

            res.render("userAdmin", {user: req.session.loggeduser, users:docs});
            
        }).clone().catch(function(err){ console.log(err)});
    }

   
});

module.exports = router;