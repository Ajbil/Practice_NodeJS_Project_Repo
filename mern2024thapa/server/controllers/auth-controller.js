const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

/*home page logic */
const home = async(req,res) => {
    try {
        res.status(200).send("Welcome to home page of MERN 2024 THAPA");
    } catch (error) {
        console.log(error);
    }
}

/*user registration logic */
/*
1. Get registration data : i.e get username, password, email etcc from req.body paratamter
2. check for email already exists or not in db
3. HAsh password'
4. Create a new user with hashed password
5. SAve user data to database'
6.Respond with either user registration succesful or handle the errors
*/

const register = async(req,res) => {
    try{
        // console.log(req.body);

        const{ username, email, phone, password} = req.body;

        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(400).json({ msg :" email alrready exists"});
        }
        // if email not already exiyts the i creata a user with the userdata i retrieved from req.body

        //hash password 
        // const saltRound =10;          // this is simple method    here done using pre middleware 
        // const hashPassword = await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({ username, email, phone, password });

        res.status(201).json({
            message : "registration successful", 
            token: await userCreated.generateToken(),            //jab bhi koi user register kar raha then we are pasing these three things message,token and userID -- aur isis token ko mujhe localstorage pe store karke rakhna hai for JWT authetication 
            userId : userCreated._id.toString(), 
            });
    }
    catch(error){
        next(error);
        // res.status(500).json("internal sever error");
    }
}

/*user login logic */
const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        const userExist  = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message : "invalid credentials"});
        }
        //if userexist then i need to compare password
        const user = await bcrypt.compare(password, userExist.password);

        if(user){
            res.status(200).json({
                message : "login successful", 
                token: await userExist.generateToken(),
                userId : userExist._id.toString(), 
             });
        }
        else{
            res.status(401).json({message : "invalid credentials"});
        }

    } catch (error) {
        res.status(500).json("internal sever error");
    }
};


// *-------------------
// User Logic : to get loogedin user data so that i can display on frontend contact us page 
// *-------------------

const user = async (req, res) => {
    try {
    //   const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData});
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };


module.exports = {home, register, login, user};