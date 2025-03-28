const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required : true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // Additional fields can be added based on your application's requirements
});

//secure the passwrod using pre middleware and bcrypt library
userSchema.pre("save", async function(next){
    // console.log("pre method", this);
    const user= this; // this has all information anout sa user which we are going to save in db  so i store it in user variable

    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound =await bcrypt.genSalt(10);          
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

//json web token
userSchema.methods.generateToken =async function() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn : "30d",
    }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;