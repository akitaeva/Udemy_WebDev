const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),                 
      bodyParser            = require("body-parser"),
      User                  = require("./models/user")
      LocalStrategy         = require("passport-local"),         
      passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });


const app         = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//setting up the sessions
app.use(require("express-session")({
    secret: "ThE SEcrEt YoU aRe KeePing",
    resave: false,
    saveUninitialized: false
}));

//setting up necessary passport methods to work in the app 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

//encoding and decoding data methods for the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==============================================
// ROUTES
//==============================================

//main page route
app.get("/", (req, res) => {
    res.render("home");
});

//restricted route
app.get("/secret", (req, res) => {
    res.render("secret");
});


// Auth Routes

//show sign up form
app.get("/register", (req, res) => {
    res.render("register");

})

//handling user sign up 
app.post("/register", (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) { 
        if (err) {
          console.log(err);
          return res.render("register", {message: "Something went wrong =[ " });
        }

        passport.authenticate("local")( req, res, () => {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", (req, res) => {
    res.render("login");

})

//login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

app.listen(3000, ()=> {
    console.log("Server is up and running on port 3000")
});