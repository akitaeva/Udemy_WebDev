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

//middleware to check comment ownership
const isCommentOwner = (req, res, next) => {
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

//edit a comment - render the prefilled form
router.get("/:comment_id/edit", isCommentOwner, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
          res.redirect("back")
      } else {
        res.render("comments/edit", {theBeach_id: req.params.id, comment: foundComment} )
      }
    });

}); 

//update the comment
router.put("/:comment_id", isCommentOwner, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/beaches/" + req.params.id);
        }
    })
})


//destroy the comment
router.delete("/:comment_id/", isCommentOwner, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");  
        } else {
            res.redirect("/beaches/" + req.params.id);
        }
    })
})


module.exports = router;    