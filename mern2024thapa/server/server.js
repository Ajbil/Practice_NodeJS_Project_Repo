require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

const corsOptions ={
    origin: "http://localhost:5173", // iska matlab hai apan backend ko bol rahe ki agar yaha se koi data aata hai ya reques aati hai data ki toh usko access dedo 
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT ,() => {
        console.log(`server is listening at port: ${PORT}`);
    });
});
