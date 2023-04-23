const path = require("path");
const express = require("express");
const { checkAdminPost } = require("../controllers/postActions");
const router = express.Router();

router.get("/postAdmin", checkAdminPost);

module.exports = router;