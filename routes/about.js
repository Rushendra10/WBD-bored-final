const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/about", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {

        res.render("about", {user: req.session.loggeduser});
    }
   
});

module.exports = router;