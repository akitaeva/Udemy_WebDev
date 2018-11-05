const mongoose = require("mongoose");

//Set up a schema for the beach entry
const beachSchema = new mongoose.Schema ({
    name: String,
    image: String,
    description: String,
})

//Compile schema into the model and export it
module.exports = mongoose.model("Beach", beachSchema);
