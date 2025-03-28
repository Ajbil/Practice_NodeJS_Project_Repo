const express = require('express');
const router = express.Router();
const User = require('./models.js');
const passport = require('passport');
const bcrypt = require('bcrypt');

//User registertaion route 
router.post("/register", async (req, res) => {
    console.log(req.body);
    const {username, email, password, confirmpassword } = req.body;
    if(!username || !email || !password || !confirmpassword){
        return res
        .status(403)
        .render("register", { error: "All fields are required" });
    }

    if(password !== confirmpassword){
        return res
        .status(403)
        .render("register", { error: "Passwords do not match" });
    }

    try {
        // check if user already exits 
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res
            .status(400)
            .render("register", {error: "Username already exists"});
        }

        //hash the password before saving it to DB 
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create and savee the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.redirect("/login");    // redirects user to login page after succeful registration
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message});
    }
});



//USer login route   --- this route handles user authentication
router.post(
    "/login",
    passport.authenticate("local", {session: false}),   //invokes local strategy funciton for authentication defined in passp.js file  and passport-session based authentication is disabled because Express sessions are used instead
    (req, res) => {
        req.session.name = req.body.username; // save the username in express-session object
        req.session.save(); // session data saved nefore redirecting 

        return res.redirect("/");   //after logeedin redirects to home 
    }
);


router.get("/logout", (req, res) => {
    req.session.destroy();   // req.session is onject provided by express-session middleware
    res.redirect("/");
});

module.exports = router;