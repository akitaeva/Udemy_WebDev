const express = require("express");
const app = express();
const request = require("request")

app.use(express.static("public"))
app.set('view engine', 'ejs');


app.get("/results", function(req, res) {
    res.send("It works!")
})



//start the server
app.listen(3000, ()=> {
    console.log("Movie App is listening on port 3000")
})
