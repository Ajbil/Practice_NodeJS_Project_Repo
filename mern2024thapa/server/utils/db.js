const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin_2024"

// mongoose.connect(URI);

const URI  = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.error("database connection successful");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;