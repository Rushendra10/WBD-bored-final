const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/contact", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("contact", {user: req.session.loggeduser});
    }
   
});

router.post("/contact", (req, res) => {

    res.redirect("/");
});

module.exports = router;