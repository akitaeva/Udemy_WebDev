const express = require("express");
const app = express();



app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("landing");
})    


app.get("/beaches", function(req, res) {
    beaches = [
        {name: "Glass Beach", image: "https://i.guim.co.uk/img/media/475ba49e737ba71ee24db8b1420bd3467e1db4ae/0_0_6000_3599/master/6000.jpg?width=860&quality=85&auto=format&fit=max&s=1941a66237c500eea42e97d9a4a28eec"},
        {name: "Fakistra", image: "https://i.guim.co.uk/img/media/1e49369a9b9e5af66fc30d55eba7017ef70c0270/0_0_5136_3083/master/5136.jpg?width=860&quality=85&auto=format&fit=max&s=5d83cd5ceccaf658373e1d1a103c3b41"},
        {name: "Greenfield Beach", image: "https://i.guim.co.uk/img/media/83ae1626339b85f23e35bb40f86d5dff87d24a24/0_75_2000_1200/master/2000.jpg?width=620&quality=85&auto=format&fit=max&s=5e190e33235e942c18b4cbc0df499aa8"},
        
    ]

    res.render("beaches", { theBeaches : beaches})
})  

//start the server
app.listen(3000, ()=> {
    console.log("The Yelp App is listening on port 3000")
})