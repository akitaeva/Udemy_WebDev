const express = require("express");
const app = express();
const request = require("request")

app.use(express.static("public"))
app.set('view engine', 'ejs');


app.get("/results", function(req, res) {
    request("http://www.omdbapi.com/?s=idaho&apikey=thewdb", (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            res.send(results["Search"][0]);
        }
    })
})



//start the server
app.listen(3000, ()=> {
    console.log("Movie App is listening on port 3000")
})
