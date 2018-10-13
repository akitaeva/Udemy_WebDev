const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hi there, welocme to my assignment!")
  })

app.get("/speak/:animal", (req, res) => {  //animal talk routes 
    let theAnimal = req.params.animal
    const sounds = {
        pig: "Oink",
        dog: 'Woof woof',
        cow: 'Moo',
        cat: "I hate humans",
        fish: "..."
    }
    let sound = sounds.theAnimal
    res.send("The " + theAnimal + " says " + sound + "!")
  })

app.get("/repeat/:what/:times", (req, res) => {  //repeat on screen routes
    
    let reps = Number(req.params.times)
    let msg = req.params.what;
    let display = msg*reps
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