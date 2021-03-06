const express    = require("express");
const bodyParser = require("body-parser")
const mongoose   = require("mongoose"),
      flash      = require("connect-flash"),
      passport   = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override");

const User    = require("./models/user"),
      Beach   = require("./models/beach"),
      Comment = require("./models/comment");   

const app = express();


//Connect to the DB
mongoose.connect("mongodb://localhost/yelp-beach", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Life is the Beach",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//middleware to pass currentUser var
app.use((req, res, next)=> {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


const commentRoutes = require("./routes/comments");
app.use("/beaches/:id/comments", commentRoutes);

const beachRoutes   = require("./routes/beaches");
app.use("/beaches", beachRoutes);

const indexRoutes   = require("./routes/index");   
app.use(indexRoutes);


//start the server
app.listen(3000, () => {
    console.log("The Yelp App is listening on port 3000")
})
