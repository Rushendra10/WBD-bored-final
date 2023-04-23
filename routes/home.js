const path = require("path");
const express = require("express");
const fs = require('fs')

const router = express.Router();

const User = require("../Models/User");
const session = require("express-session");
const Post = require("../Models/Post");

const axios = require('axios');

const {getPost} = require('../controllers/postActions')

/**
 * @swagger
 * /:
 *   get:
 *     summary: This will get all the unique categories so that they can be displayed as cards
 *     responses:
 *       200:
 *         description: The categories have been retrieved
 *         content:
 *           application/json:
 *             schema:  
 *               type: array
 *               items:
 *                 "categories": "movies"
 * 
 */

router.get("/", getPost);

module.exports = router;
