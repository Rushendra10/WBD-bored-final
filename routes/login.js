const path = require("path");
const express = require("express");
const router = express.Router();


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

router.post("/login", (req, res) => {

    User.findUserByEmail(req.body.email, (docs) => {

        if (docs===null){
            
            res.redirect("/login");
        }

        else {

            if (docs.password===req.body.password){

                // req.session.loggeduser=req.body.email;

                req.session.loggeduser=docs;

                console.log(req.body.email);

                console.log("Logged in");

                // console.log(docs);

                // res.render("index", {user: req.session.loggeduser});
                res.redirect("/");
            }

            else {

                res.redirect("/login");

            }
        }
    })
    
});

router.post("/register", upload.single("pfpicture"), (req, res) => {

    // console.log(req.body);

    let newUser = new User({profilePicture: req.file.filename , name: req.body.name, username: req.body.username, email: req.body.email, age: req.body.age, gender: req.body.gender, bio:req.body.bio ,password: req.body.password, });

    User.findOne({username: req.body.username, email: req.body.email}, (err, docs) => {

        if (docs==null){

            User.findOne({email: req.body.email}, (err, docs) => {

                if (docs==null){

                    User.saveUser(newUser);

                    res.redirect("/")
                }

                else {

                    res.redirect("/register");
                }
            })

            // console.log(docs);

            // console.log("in the if");

            // User.saveUser(newUser);
        }

        else {
            
            res.redirect("/register");

        }
    }) 

    // console.log(newUser);

});

router.get("/register", (req, res) => {

    // res.sendFile(path.join(__dirname, "..", "views", "register.html"));
    res.render("register");
});


module.exports = router;

