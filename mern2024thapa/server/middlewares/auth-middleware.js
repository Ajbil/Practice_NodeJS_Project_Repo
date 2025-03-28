//herre in this file only i am going to verify that token is valid or not and if valid then i will send user data to req.user property in auth-controllers.js file 

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");   // frontend se jo token aa raha (jo ki Auhtorization key ki value hai with Bearer prefix  vo get kar rahe hum abhi)

  if (!token) {
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();  
  console.log(jwtToken);

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    // getting the complete user details & also we don't want password to be sent  -- .select() : yeah mongoDb ka inbulit function hai 
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    /*In Express.js, req (request) object is an object that contains information about the HTTP request. By adding custom properties to req, you can pass information between middleware functions or make it available in your route handlers. */
    req.token = token;
    req.user = userData; //toh ab req.user pe mere complete user ka data aaagaya hai except password and vahi toh auth-controller.js line 91 mai mujhe chaiye tha --i.e -- const userData = req.user;
    req.userID = userData._id;
    /*
    In your authMiddleware:

    req.token: This property is storing the JWT token extracted from the request header. You might use it later to perform additional actions or validations.
    req.user: This property is storing the user data fetched from the database based on the information stored in the JWT token. It allows you to access user-related information in subsequent middleware functions or route handlers. This is often used to identify the authenticated user.
    req.userID: This property is storing the _id of the authenticated user. It provides a convenient way to access the user's ID in your route handlers
    */
    
    next();  // Move on to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;