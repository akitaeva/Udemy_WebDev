const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

const app         = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});










app.listen(3000, ()=> {
    console.log("Server is up and running on port 3000")
});