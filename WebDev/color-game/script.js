

let pickedColorDisplay = document.getElementById("pickedColor")
const messageDisplay = document.querySelector("#message");
const squares = document.querySelectorAll(".square");


const setField = () => {
   let colors = fillInColors(6);
   let pickedColor = colors[Math.floor(Math.random() * colors.length)];
   console.log("colors here: ", colors)
    //add intial colors to sqaures
   squares.forEach((oneSquare, i) => {
    oneSquare.style.backgroundColor = colors[i]
   })
   //add click listeners to squares
   squares.forEach((oneSquare, i) => {
    oneSquare.addEventListener("click", ()=>{
    let clickedColor = oneSquare.style.backgroundColor;   
     if (clickedColor === pickedColor) {
         messageDisplay.textContent = "Correct!";
         changColors();
        }  
     else {
        messageDisplay.textContent = "Try again!";
        oneSquare.style.backgroundColor = "#2b3c53"
     }
    })
   })
}

const changColors = () => {
    squares.forEach((square) =>{
    square.style.backgroundColor = pickedColor;
    })
}

const fillInColors = (num) => {
   let arr = [];
   for (let i=0; i<num; i++) {
        arr.push(getRandomColor());
        console.log(arr);
    }
    return arr;
}

const getRandomColor = () => {
   let red = Math.floor(Math.random() * 256);
   let green = Math.floor(Math.random() * 256);
   let blue = Math.floor(Math.random() * 256)
   console.log("rgb("+red+", "+green+", "+blue+")");
   return ("rgb("+red+", "+green+", "+blue+")");
   // "rgb(0, 176, 214)",
   
}

setField();
pickedColorDisplay.textContent = pickedColor;