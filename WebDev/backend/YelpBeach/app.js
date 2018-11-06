const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const Beach = require("./models/beach")


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
            res.render("index", { theBeaches : allBeaches})
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
    res.render("addNew.ejs");
})

//SHOW - details about a specific beach - find by id and render the template
app.get("/beaches/:id", (req,res) => {
    Beach.findById(req.params.id, (err, foundBeach)=> {
       if (err) {
           console.log(err);
       } else {
        res.render("beachDetails", {theBeach: foundBeach});
       }
    });
    
})

//start the server
app.listen(3000, () => {
    console.log("The Yelp App is listening on port 3000")
})
