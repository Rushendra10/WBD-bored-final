const User = require("../Models/User");

const deleteUser = async (req, res) =>{

    console.log(req.body);
   
    await User.deleteOne({profilePicture: req.body.userid}, (err, docs) => {

    }).clone().catch(function(err){ console.log(err)});

    res.redirect("/userAdmin");
}

const editUser = async (req, res) =>{

    console.log(req.body.email);

    // user.age = req.body.age;

    // user.email = req.body.email;

    // user.password = req.body.password;

    // user.bio = req.body.bio;

    console.log()
    console.log(req.body.age);

    await User.findOneAndUpdate(

        {
            username: req.session.loggeduser.username
        },

        {
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio
        }
    )
    
    
    res.redirect("/");
   
}

const userDetails = (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("profile", {user: req.session.loggeduser});
    }
   
}

const checkAdmin = async (req, res) =>{

    if (req.session.loggeduser.email!="rush910@gmail.com"){

        res.redirect("/oops");
    }

    else {

        await User.find({}, (err, docs)  => {

            res.render("userAdmin", {user: req.session.loggeduser, users:docs});
            
        }).clone().catch(function(err){ console.log(err)});
    }

   
}



module.exports = {deleteUser, editUser, userDetails, checkAdmin}