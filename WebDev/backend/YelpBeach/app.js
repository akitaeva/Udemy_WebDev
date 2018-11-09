const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const Beach = require("./models/beach");
const Comment = require("./models/comment")


//Connect to the DB
mongoose.connect("mongodb://localhost/yelp-beach", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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

//start the server
app.listen(3000, () => {
    console.log("The Yelp App is listening on port 3000")
})
