const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

//adding new cat to the DB

// let george = new Cat ({
//     name: "Ms. Norris",
//     age: 19,
//     temperament: "evil"
// });

// george.save((err, cat)=> {
//    if (err) {
//        console.log("something went WRONG!")
//    } else {
//        console.log("We just saved a cat to the DB");
//        console.log(cat);
//    }
// });

// Cat.create({
//     name: "Gash",
//     age: 7,
//     temperament: "chill"
// }, (err, cat) => {
//     if (err){
//         console.log("Oh no, error creating a cat! =(");
//         console.log(err);
//     } else {
//       console.log("Created the cat:");
//       console.log(cat)
//     }
// });


Cat.find({}, (err, cats)=> {
  if (err){
      console.log("Oh no, error! =(");
      console.log(err);
  } else {
    console.log("All the cats....");
    console.log(cats)
  }
})