const path = require("path");
const express = require("express");
const Post = require("../Models/Post");

const {deletePost} = require('../controllers/postActions');
const router = express.Router();


router.post("/deletePost", deletePost);

module.exports = router;