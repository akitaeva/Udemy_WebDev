const Beach       = require("./../models/beach"),
      Comment     = require("./../models/comment");

//all the middleware goes here

const middlewareObj = {};

//middleware to check logged/unlogged
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}

//middleware to check entry ownership
middlewareObj.isEntryOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Beach.findById(req.params.id, (err, foundBeach) => {
            if (err) {
                console.log(err);
                res.redirect("back")
               }
            else {
            // checking if the user owns the entry
              if (foundBeach.author.id.equals(req.user._id)) {
                  next();
                } else {
                 res.redirect("back")
               }
           }    
        })  
    } else {
        res.redirect("back")
    }
}

//middleware to check comment ownership
middlewareObj.isCommentOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
                res.redirect("back")
               }
            else {
            // checking if the user owns the comment
              if (foundComment.author.id.equals(req.user._id)) {
                  next();
                } else {
                 res.redirect("back")
               }
           }    
        })  
    } else {
        res.redirect("back")
    }
}

module.exports = middlewareObj;