const express = require('express');
const passport = require('passport');
const User = require('./models.js');
const localStrategy = require("./passp.js"); // defined passport local stategy for authentication
const controllers = require('./controllers.js');
const cookieParser = require('cookie-parser');  //parses cookie to handle session based authentication
const connectDB = require("./db.js");
const ejs = require('ejs');
const bodyParser = require('body-parser');  //Parses incoming form data (JSON & URL-encoded).
const routes = require("./pages.js");
const session = require('express-session');  //Stores user session data 


const app = express();
connectDB();

app.use(
    session({   /// configuring sessions for authnticaiton -- Sessions store user login data, allowing users to stay logged in.
        secret: "ArihantLogin123",  // used to encrypt session data 
        resave: false,
        saveUninitialized: false,
    })
);

app.use(cookieParser());
app.use(bodyParser.json()); // parses JSON data in req
app.use(bodyParser.urlencoded({ extended: true }));  // parse form data 
app.use(passport.initialize());
app.use(passport.session());   // enables session-based authentication.
app.set('view engine', 'ejs');  //sets ejs as templating engine 

//Serialize and deserialize user objects to maintain user sessions
passport.serializeUser((user, done) => done(null, user.id));   //it is used to determine what data of the user should be stored in session here we store user id 
passport.deserializeUser((id, done) => {  // to retrieve full user detail from session using serialized user id . authnticated user's data is made availabe in req.user
    User.findById(id, (err, user) => done(err, user));
});

app.use("/api/", controllers);  // handles login-logout authentication logic
app.use("/", routes);   // handles frontend navigation between  login , register page route

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on pport ${port}`);
});