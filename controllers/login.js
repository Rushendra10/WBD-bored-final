const User = require("../Models/User")
const bcrypt = require('bcrypt');

const saltRounds = 10;  

const register = (req, res) => {

    // console.log(req.body);

    let pass = req.body.password;

    // let hashedPass = hashPassword(pass);

    let hashedPass = bcrypt.hashSync(pass, saltRounds, (err, res) => {
        if (err){
            console.log(err);
        }
    })

    let newUser = new User({profilePicture: req.file.filename , name: req.body.name, username: req.body.username, email: req.body.email, age: req.body.age, gender: req.body.gender, bio:req.body.bio ,password: hashedPass});

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

}


const login = (req, res) => {

    User.findUserByEmail(req.body.email, (docs) => {

        if (docs===null){
            
            res.redirect("/login");
        }

        else {

            let flag = false;

            flag = bcrypt.compareSync(req.body.password, docs.password, (err, res) => {
                
                if (err){
                    console.log(err);
                }
            })

            if (docs.password==req.body.password){
                flag=true;
            }

            if (flag){

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
    
}

module.exports = {register, login}