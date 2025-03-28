const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/LoginAuth", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Compass"))  // mongoDb compass App installed on laptop and connected to it there LoginAuth db is created and users cllection is created within it when i create a login for a user using frontend
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

module.exports = connectDB;