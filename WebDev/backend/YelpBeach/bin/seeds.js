const mongoose = require('mongoose');
const Beach = require("./../models/beach")

//Drop all the existing beach entries from the the DD
Beach.remove({}, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("removed all existing beach entries from the DB")
    }
})

//Connect to the DB
mongoose.connect("mongodb://localhost/yelp-beach", { useNewUrlParser: true });

const beachesArr = [
    {
      name: "Glass Beach", 
      image: "https://i.guim.co.uk/img/media/475ba49e737ba71ee24db8b1420bd3467e1db4ae/0_0_6000_3599/master/6000.jpg?width=860&quality=85&auto=format&fit=max&s=1941a66237c500eea42e97d9a4a28eec"
    }, 
    {
      name: "Fakistra", 
      image: "https://i.guim.co.uk/img/media/1e49369a9b9e5af66fc30d55eba7017ef70c0270/0_0_5136_3083/master/5136.jpg?width=860&quality=85&auto=format&fit=max&s=5d83cd5ceccaf658373e1d1a103c3b41"
    },
    { 
      name: "Greenfield Beach", 
      image: "https://i.guim.co.uk/img/media/83ae1626339b85f23e35bb40f86d5dff87d24a24/0_75_2000_1200/master/2000.jpg?width=620&quality=85&auto=format&fit=max&s=5e190e33235e942c18b4cbc0df499aa8"
    },
 ]

Beach.create(beachesArr)
    .then((result)=>{
        console.log(`created ${result.length} beach entries`);
        result.forEach(oneBeach => {
            console.log('In DB ', oneBeach.name)
        })
        mongoose.disconnect();
            
        })
    .catch((err)=>{
            console.log('Error creating activity collection', err)
        })