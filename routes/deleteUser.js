const path = require("path");
const express = require("express");
const User = require("../Models/User");

const {deleteUser} = require('../controllers/userActions')
const router = express.Router();

router.post("/deleteUser", deleteUser);

module.exports = router;