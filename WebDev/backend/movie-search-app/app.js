const express = require("express");
const app = express();
const request = require("request")


app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("search");
})    

app.get("/results", function(req, res) {
    let searchTerm = req.query.search;
    let url = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=thewdb"
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    })
})



//start the server
app.listen(3000, ()=> {
    console.log("Movie App is listening on port 3000")
})
