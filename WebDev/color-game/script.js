let pickedColorDisplay = document.getElementById("pickedColor");
const messageDisplay = document.querySelector("#message");
const squares = document.querySelectorAll(".square");
const heading = document.querySelector("#heading");
const reset = document.querySelector("#reset");
const level = document.querySelector("#level");


const setField = () => {
   //getting array of colors according to the difficulty level 
   let colors = fillInColors(6);
   //chosing the color to be guessed
   let pickedColor = colors[Math.floor(Math.random() * colors.length)];
   console.log("pickedColor in setField ", pickedColor)
   //displaying the color to guess in the HTML doc
   pickedColorDisplay.textContent = pickedColor;
   //changing the heading background to default
   heading.style.backgroundColor = "#2b3c53";
   //add the colors to sqaures
   squares.forEach((oneSquare, i) => {
    oneSquare.style.backgroundColor = colors[i]
   })
 
   //add "click" listeners to squares
   squares.forEach((oneSquare) => {

      oneSquare.addEventListener("click", ()=>{  
        console.log ("are stuck in this part??", pickedColor);  
        let clickedColor = oneSquare.style.backgroundColor;  
          if (clickedColor === this.pickedColor.textContent) 
           {  
             messageDisplay.textContent = "Correct!";
             changeColors();
             heading.style.backgroundColor = pickedColor;
             console.log("heading background ", heading.backgroundColor)
           }  
          else 
           {
             messageDisplay.textContent = "Try again!";
             oneSquare.style.backgroundColor = "#2b3c53"
             console.log ("stuck in else??", pickedColor);
           }
        })
         
   })
}


const changeColors = () => {
    squares.forEach((square) =>{
    console.log("are you here? ", pickedColor)
    square.style.backgroundColor = pickedColor.textContent;
    })
}

const fillInColors = (num) => {
   let arr = [];
   for (let i=0; i<num; i++) {
        arr.push(getRandomColor());
    }
    return arr;
}

const getRandomColor = () => {
   let red = Math.floor(Math.random() * 256);
   let green = Math.floor(Math.random() * 256);
   let blue = Math.floor(Math.random() * 256)
   //what is returned ?:
   console.log("what is returned in getRandomColor: rgb("+red+", "+green+", "+blue+")");
   return ("rgb("+red+", "+green+", "+blue+")");

   
}

setField();

reset.addEventListener("click", ()=> {
    if (prompt("Would you like to start a new game? ")) {
        setField();
    }
  
})

level.addEventListener("click", ()=> {


})