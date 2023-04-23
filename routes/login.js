const path = require("path");
const express = require("express");
const router = express.Router();

const {login, register}= require('../controllers/login')




/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - name
 *         - email
 *         - age
 *         - gender
 *         - password
 *         - profilePicture
 *         - bio
 *
 *        
 *       properties:
 *         username:
 *           type: string
 *           description: This will be a unique identifier for each user within the application. 
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: This will be the email address used to register the user and will be unique for every user.
 *         age:
 *           type: Number
 *           description: Age of the user
 *         gender:
 *           type: string
 *           description: User's gender
 *         password:
 *           type: string
 *           description: User account's password.
 *         profilePicture:
 *           type: string
 *           description: Name of the user's profile picture. The actual picture is stored in the local storage.
 *         bio:
 *           type: string
 *           description: A short description of the user
 * 
 * 
 *    
 */


//----------------------------------------------

const multer = require("multer");

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        let path = "./public/uploads";
        cb(null, path);
    },

    filename: (req, file, cb) => {

        // console.log(file)

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

//----------------------------------------------

const User = require("../Models/User");
const { redirect } = require("express/lib/response");



router.get("/login", (req, res) => {

    res.render("login");
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Gets the information that the user has has input when registering
 *     responses:
 *       200:
 *         description: The specific user has been found
 *         content:
 *           application/json:
 *             schema:  
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post("/login", login);


router.post("/register", upload.single("pfpicture"), register);

router.get("/register", (req, res) => {

    // res.sendFile(path.join(__dirname, "..", "views", "register.html"));
    res.render("register");
});


module.exports = router;

