const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.send("this is to be the landing page!!");
})    


//start the server
app.listen(3000, ()=> {
    console.log("The Yelp App is listening on port 3000")
})
