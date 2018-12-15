const Beach       = require("./../models/beach"),
      Comment     = require("./../models/comment"),

      flash       = require("connect-flash");

//all the middleware goes here

const middlewareObj = {};

//middleware to check logged/unlogged
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
       return next();
    }
    req.flash("error", "Please log in first!");
    res.redirect("/login");
}

//middleware to check entry ownership
middlewareObj.isEntryOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Beach.findById(req.params.id, (err, foundBeach) => {
            if (err || !foundBeach ) {
                console.log(err);
                req.flash("error", "Error finding the entry")
                res.redirect("back")
               }
            else {
            // checking if the user owns the entry
              if (foundBeach.author.id.equals(req.user._id)) {
                  next();
                } else {
                 req.flash("error", "You don't have permission for this action!")   
                 res.redirect("back")
               }
           }    
        })  
    } else {
        req.flash("error", "You have to be logged in to do that!")   
        res.redirect("back")
    }
}

//middleware to check comment ownership
middlewareObj.isCommentOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                console.log(err);
                req.flash("error", "Error finding the comment")  
                res.redirect("back")
               }
            else {
            // checking if the user owns the comment
              if (foundComment.author.id.equals(req.user._id)) {
                  next();
                } else {
                    req.flash("error", "You don't have permission for this action!");     
                 res.redirect("back");
               }
           }    
        })  
    } else {
        res.redirect("back")
    }
}

module.exports = middlewareObj;