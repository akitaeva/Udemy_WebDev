const express = require("express"),
      router  = express.Router();

//middleware to check logged/unlogged
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}


router.get("/", function(req, res) {
    res.render("landing");
})    


//================================
//AUTH ROUTES
//================================

//show register form
router.get("/register", (req, res) => {
    res.render("register");
})

//handle sign up logic
router.post("/register", (req, res) => {
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
router.get("/login", (req, res) => {
    res.render("login");

})

//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/beaches",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("you've made it!")
});

//logout logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
});

module.exports = router;