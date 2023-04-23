const path = require("path");
const express = require("express");

const {userDetails} = require('../controllers/userActions')

const router = express.Router();

router.get("/profile", userDetails);

module.exports = router;
