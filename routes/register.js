const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/register.html", (req, res) =>{

    res.render("register");
   
});

module.exports = router;

