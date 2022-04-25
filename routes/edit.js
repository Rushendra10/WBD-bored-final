const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/edit", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("edit", {user: req.session.loggeduser});
   
    }
});

router.post("/edit", (req, res) =>{

    res.redirect("/");
   
});

module.exports = router;