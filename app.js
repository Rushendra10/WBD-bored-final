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

const userAdminRoutes = require("./routes/userAdmin");

const postAdminRoutes = require("./routes/postAdmin");

const deletePost = require("./routes/deletePost");

const deleteUser = require("./routes/deleteUser");

const oopsRoutes = require("./routes/oops");

const searchRoutes = require('./routes/search');

const app = express();

const db = require("./Database/connection");

const bodyParser = require('body-parser');
const { ppid } = require('process');

const morgan  = require('morgan');

const fs = require('fs');

const helmet = require('helmet');

const swaggerUI = require('swagger-ui-express');

const swaggerJSDoc = require('swagger-jsdoc');



// ------------------------------------------------------- //

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "bored API",
			version: "1.0.0",
			description: "A simple Express Blogging API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);


// ------------------------------------------------------- //

// app.use(helmet());

app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

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

app.use(userAdminRoutes);

app.use(postAdminRoutes);

app.use(deletePost);

app.use(deleteUser);

app.use(oopsRoutes);

app.use(searchRoutes);


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


// app.use(express.cookieParser());

// app.get("/", (req, res) =>{
//     res.sendFile(path.join(__dirname, "views", "index.html"));
   
// });







module.exports = app;

var postModel = require('./Models/Post');

app.listen(3000);
