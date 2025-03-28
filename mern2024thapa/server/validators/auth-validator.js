const {z} = require("zod");

//first we did simply as in all projects we do make mongoose schema adn then model now here we do using zod package 
//creating a object schemea
const signupSchema = z.object({
    username: z
    .string({ required_error: "Name is required"})
    .trim()
    .min(3,{ message : "Name must be atleast 3 chars long"})
    .max(255,{ message : "Name must not be more than 255 chars"}),
    email: z
    .string({ required_error: "Email is required"})
    .trim()
    .email({message : "Inavlid Email"})
    .min(3,{ message : "Email must be atleast 3 chars long"})
    .max(255,{ message : "Email must not be more than 255 chars"}),
    phone: z
    .string({ required_error: "Phone No. is required"})
    .trim()
    .min(10,{ message : "phone must be atleast 10 chars long"})
    .max(20,{ message : "phone must not be more than 20 chars"}),
    password: z
    .string({ required_error: "Password is required"})
    .min(3,{ message : "Password must be atleast 3 chars long"})
    .max(1024,{ message : "Password must not be more than 1024 chars"}),
})

module.exports = signupSchema;