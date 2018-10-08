let colors = [
    "rgb(0, 176, 214)",
    "rgb(22, 102, 90)",
    "rgb(160, 36, 34)",
    "rgb(34, 15, 180)",
    "rgb(42, 76, 94)",
    "rgb(164, 116, 84)",
]

let pickedColorDisplay = document.getElementById("pickedColor")
const messageDisplay = document.querySelector("#message");
const squares = document.querySelectorAll(".square");

const setField = (colors) => {
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

const pickColor = () => {
   return colors[Math.floor(Math.random() * colors.length)]
}
let pickedColor = pickColor();

setField(colors);
pickedColorDisplay.textContent = pickedColor;