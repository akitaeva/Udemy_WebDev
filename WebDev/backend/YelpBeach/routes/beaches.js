const express = require("express"),
      router  = express.Router({mergeParams: true});

const Beach   = require("./../models/beach")      

//middleware to check logged in or not 
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}

//middleware to check entry ownership
const isEntryOwner = (req, res, next) => {
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

//index route
router.get("/", (req,res) =>  {
    //get all beaches from DB
    Beach.find({}, (err, allBeaches) => {
        if(err) {
            console.log(err);
        } else {
            res.render("beaches/index", { theBeaches : allBeaches});
        }

    });

})  

//creating new entry
router.post("/", isLoggedIn, (req,res) => {
    //creating an author object from the logged in user
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    ///Taking the entry data from the form
    const newBeach = { name: req.body.name, image: req.body.image, description: req.body.description, author: author }
    //Create a new beach entry and save to the DB
    Beach.create(newBeach, (err, newlyCreated) => {
      if(err) {
          console.log(err);
      } else {
        res.redirect("beaches");
      }
    })

})

//NEW - show a form for a new beach entry
router.get("/new", isLoggedIn, (req,res) => {
    res.render("beaches/new");
})

//EDIT - show a form to edit a beach entry
router.get("/:id/edit", isEntryOwner, (req,res) => {
     Beach.findById(req.params.id, (err, foundBeach) => {
                  res.render("beaches/edit", {theBeach: foundBeach});
    });          
});

//UPDATE - send captured data to the server
router.put("/:id", (req, res) => {
    Beach.findByIdAndUpdate(req.params.id, req.body.Beach, (err, updBeach) => {
        if (err) {
            res.redirect("/beaches");
        } else {
            res.redirect("/beaches/" + req.params.id);
        } 
    })
})

//DESTROY - remove an entry
router.delete("/:id", (req, res) => {
    Beach.findOneAndDelete(req.params.id, (err) => {
        if (err) {
            res.redirect("/beaches");
        } else {
            res.redirect("/beaches");
        }
    })
})

//SHOW - details about a specific beach - find by id and render the template
router.get("/:id", (req,res) => {
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
    
});


module.exports = router;
