const path = require("path");
const express = require("express");
const { checkAdmin } = require("../controllers/userActions");
const router = express.Router();

router.get("/userAdmin", checkAdmin);

module.exports = router;