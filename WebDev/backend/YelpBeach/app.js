const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local");

const User    = require("./models/user");
const Beach   = require("./models/beach");
const Comment = require("./models/comment")

const app = express();


//Connect to the DB
mongoose.connect("mongodb://localhost/yelp-beach", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

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

app.get("/", function(req, res) {
    res.render("landing");
})    


app.get("/beaches", (req,res) =>  {
    //get all beaches from DB
    Beach.find({}, (err, allBeaches) => {
        if(err) {
            console.log(err);
        } else {
            res.render("beaches/index", { theBeaches : allBeaches})
        }

    });

})  

app.post("/beaches", (req,res) => {
    ///Taking the entry data from the form
    let newBeach = { name: req.body.name, image: req.body.image, description: req.body.description, }
    //Create a new beach entry and save to the DB
    Beach.create(newBeach, (err, newlyCreated) => {
      if(err) {
          console.log(err);
      } else {
        res.redirect("beaches");
      }
    })

})

app.get("/beaches/new", (req,res) => {
    res.render("beaches/new");
})

//SHOW - details about a specific beach - find by id and render the template
app.get("/beaches/:id", (req,res) => {
    //find the beach by the provided id
    Beach.findById(req.params.id)
    .populate("comments")
    .exec((err, foundBeach)=> {
       if (err) {
           console.log(err);
       } else {
        res.render("beaches/show", {theBeach: foundBeach});
       }
    });
    
})

//========================================
//       COMMENTS ROUTES
//========================================

app.get("/beaches/:id/comments/new", (req, res) =>{
    //find beach by id 
    Beach.findById(req.params.id, function(err, foundBeach) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {theBeach: foundBeach});
        }
    })
});

app.post("/beaches/:id/comments", (req, res) =>{ 
    Beach.findById(req.params.id, function(err, foundBeach) {
        if (err) {
            console.log(err);
        } else  {
            Comment.create(req.body.comment, (err, comment) =>{ 
                if (err) {
                    console.log(err);
                } else  {
                    foundBeach.comments.push(comment);
                    foundBeach.save();
                    res.redirect("/beaches/" + foundBeach._id);
                }    
            })
           }       
        })    
})

//================================
//AUTH ROUTES
//================================

//show register form
app.get("/register", (req, res) => {
    res.render("register");
})

//handle sign up logic
app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, ()=> {
           res.redirect("/beaches");
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
    successRedirect: "/beaches",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("you've made it!")
});

//logout logic
app.get("/logout", (req, res) => {
    req.logout();
    res.rendirect("/", {message: "You've been logged out...Not YET!! =["})
});


//start the server
app.listen(3000, () => {
    console.log("The Yelp App is listening on port 3000")
})
