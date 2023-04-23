const express = require("express");
const router = express.Router();

router.get("/oops", (req, res) => {

    res.render("oops", {user: req.session.loggeduser})
})

module.exports = router