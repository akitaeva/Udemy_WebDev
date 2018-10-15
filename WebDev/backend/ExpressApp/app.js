const express = require("express");
const app = express();

//home page
app.get("/", (req, res) => {
  res.send("Hi there!")
})


app.get("/bye", (req, res) => {
    res.send("Goodbye!")
  })
  

app.get("/dog", (req, res) => {
    res.send("Woof!")
  })
    

  app.get("*", (req, res) => {     //catch-all route for every request to non-existing address 
    res.send("Whatever you're looking for, it's not here =|")
  })
    
//start the server
app.listen(3000, ()=> {
    console.log("App is listening on port 3000")
})