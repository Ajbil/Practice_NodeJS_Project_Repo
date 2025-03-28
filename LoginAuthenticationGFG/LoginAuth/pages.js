const express = require('express');
const router = express.Router();

//Home page route
router.get("/", (req, res) => {
    if(req.session.name){   //checks if user is logged in then there name is passed  to home.ejs
        var name  = req.session.name;
        return res.render("home", {name: name});
    }
    res.render("home", {name: null});
});

//Login page route
router.get("/login", (req, res) => {
    if(req.session.name){
        return res.redirect("/");  // if user already logged in it redirects  to homepage  instead of showing login ppage -- Redirects authenticated users to avoid multiple logins.
    }
    res.render("login", {error: null});
});

//Register page route
router.get("/register", (req, res) => {
    if(req.session.name){
        return res.redirect("/");
    }
    res.render("register", {error: null});
});

module.exports = router;


//key feature used here is -- Session-based authentication → Prevents logged-in users from accessing login/register pages.  as if req.session.name is true then we redirect logged in user to home to prevent multiple logins 
