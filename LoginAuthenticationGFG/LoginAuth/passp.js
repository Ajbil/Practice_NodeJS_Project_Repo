//This file defines how user authentication is handled using Passport.js with a local strategy 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  // local srategy verifies user based on suername and password
const bcrypt = require('bcrypt');
const User = require('./models.js');

//This strategy is invoked when a user logs in (POST /login in controllers.js). 


passport.use(
    new LocalStrategy(async (username, password, done) => {    //done is a calllback function used to handle result of authentication 
        try {
            //find user in DB
            const user = await User.findOne({ username });
            // if userr does not exit retur an eror
            if(!user){
                return  done(null, false, {error : "Incorrect username"});
            }

            //comapre provided passowrd with hashed pass in DB
            const passwordsMatch = await bcrypt.compare(
                password,        // password  user entered 
                user.password    // hashed password from DB
            );

            //if pass matches, return user objet
            if(passwordsMatch){
                return done(null, user);  // user object is passed to done function
            }
            else{
                return done(null, false, {error: "incorrect password"});
            }
        }
        catch(err){
            return done(err);
        }
    })
);