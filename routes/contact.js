const path = require("path");
const express = require("express");
const router = express.Router();

const sendMail = require('../controllers/sendMail');


router.get("/contact", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("contact", {user: req.session.loggeduser});
    }
   
});

router.post("/contact", sendMail);

module.exports = router;