const express = require("express"),
      router  = express.Router({mergeParams: true});

const Beach   = require("./../models/beach"),
      Comment = require("./../models/comment");
      


//middleware to check logged/unlogged
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}
      
//show form to create new
router.get("/new", isLoggedIn, (req, res) =>{
    //find beach by id 
    Beach.findById(req.params.id, (err, foundBeach) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {theBeach: foundBeach});
        }
    })
});

//comments create
router.post("/", isLoggedIn, (req, res) =>{ 
    Beach.findById(req.params.id, (err, foundBeach) =>{
        if (err) {
            console.log(err);
        } else  {
            Comment.create(req.body.comment, (err, comment) =>{ 
                if (err) {
                    console.log(err);
                } else  {
                    //add username and user id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log("who left the comment ?  + ", req.user.username)
                    //save the comment
                    comment.save();
                    foundBeach.comments.push(comment);
                    foundBeach.save();
                    res.redirect("/beaches/" + foundBeach._id);
                }    
            })
           }       
        })    
})

module.exports = router;