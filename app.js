
const express = require('express');

const path = require('path');

const session = require('express-session');

const loginRoutes = require("./routes/login");

const homeRoutes = require("./routes/home");

const registerRoutes = require("./routes/register");

const profileRoutes = require("./routes/profile");

const postRoutes = require("./routes/post");

const feedRoutes = require("./routes/feed");

const aboutRoutes = require("./routes/about")

const contactRoutes = require("./routes/contact")

const storyRoutes = require("./routes/story")

const editRoutes = require("./routes/edit")

const app = express();

const db = require("./Database/connection");

const bodyParser = require('body-parser');
const { ppid } = require('process');


// ------------------------------------------------------- //


// ------------------------------------------------------- //

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({

    secret: "secret-key",
    resave: true,
    saveUninitialised: true,

    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));


app.set("view engine", "ejs");

app.use(loginRoutes);

app.use(homeRoutes);

app.use(registerRoutes);

app.use(profileRoutes);

app.use(feedRoutes);

app.use(aboutRoutes);

app.use(contactRoutes);

app.use(postRoutes);

app.use(storyRoutes);

app.use(editRoutes);



// app.use(express.cookieParser());

// app.get("/", (req, res) =>{
//     res.sendFile(path.join(__dirname, "views", "index.html"));
   
// });
module.exports = app;

var postModel = require('./Models/Post');

app.listen(3000);
