const express  = require("express"),
      router   = express.Router(),
      passport = require("passport");

const User = require("./../models/user");      


//default route 
router.get("/", function(req, res) {
    res.render("landing");
})    


//AUTH ROUTES
//show register form
router.get("/register", (req, res) => {
    res.render("register");
})

//handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("register")
        }
        passport.authenticate("local")(req, res, ()=> {
           req.flash("success", "Welcome to Yelp Beach " + user.username)
           res.redirect("/beaches");
        });
    });
});


// LOGIN ROUTES
//render login form
router.get("/login", (req, res) => {
    res.render("login");

})

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/beaches",
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    console.log("you've made it!", res)
});

//logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged you out!")
    res.redirect("/")
});

module.exports = router;