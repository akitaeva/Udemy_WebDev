const express = require("express");
const app = express();
const bodyParser = require("body-parser");


let friends = ["Charlie", "Suzie", "Marshall", "Olaf", "Kathy"]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home.ejs")
  })

app.get("/friends", (req, res) => {
    res.render("friends", {theFriends: friends})
  })  


app.post("/friends", (req, res) => {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.render("friends", {theFriends: friends})
  }) 

app.get("/posts", (req, res) => { 
    let posts = [
        {title: "what in the world?", author: "Suzie"},
        {title: "layout trends", author: "Charlie"},
        {title: "best local craft beers", author: "Magnus"}
    ];

    res.render("posts", {thePosts: posts})

})  

app.get("/speak/:animal", (req, res) => {  //animal talk routes 
    let theAnimal = req.params.animal.toLowerCase();
    const sounds = {
        pig: "Oink",
        dog: 'Woof woof',
        cow: 'Moo',
        cat: "I hate humans",
        fish: "..."
    }
    let sound = sounds[theAnimal];
    res.send("The " + theAnimal + " says " + sound + "!")
  })

app.get("/repeat/:what/:times", (req, res) => {  //repeat on screen routes
    
    let reps = Number(req.params.times)
    let msg = req.params.what;
    let display = "";
    for (i=0; i<reps; i++) {
        display +=msg + " "
    }
    console.log("$$$$HERE req.params.what*reps: ", reps)
    res.send(display);

})

  
app.get("*", (req, res) => {     //catch-all route for every request to non-existing address 
    res.send("Sorry page not found...What are you doing with your life?")
})

//start the server
app.listen(3000, ()=> {
    console.log("App is listening on port 3000")
})