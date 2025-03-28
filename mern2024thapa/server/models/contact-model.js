//here also i can do same as did in user-model.js but one diffenrt way thapa told to write i.e here i destructure schma and model on first line only 

const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
});

//create a collection 
const Contact = new model("Contact", contactSchema);
module.exports = Contact;
