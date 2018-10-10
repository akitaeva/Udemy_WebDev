let pickedColorDisplay = document.getElementById("pickedColor");
const messageDisplay = document.querySelector("#message");
const squares = document.querySelectorAll(".square");
const heading = document.querySelector("#heading");
const reset = document.querySelector("#reset");
let level = "hard" 
const modeBtns = document.querySelectorAll(".mode");

const setField = () => {
   //getting array of colors according to the difficulty level 
   messageDisplay.textContent = "Pick a square to match the color";
   let sizeOfField = setLevel(level);
   console.log("sizeOfField ******** ", sizeOfField)
   let colors = fillInColors(sizeOfField);
   //chosing the color to be guessed
   let pickedColor = colors[Math.floor(Math.random() * colors.length)];
   //displaying the color to guess in the HTML doc
   pickedColorDisplay.textContent = pickedColor;
   //changing the heading background to default
   heading.style.backgroundColor = "#577ea0";
   reset.textContent = "New Colors";
   //add the colors to sqaures
   squares.forEach((oneSquare, i) => {
    if (colors[i]) {
        oneSquare.style.backgroundColor = colors[i]
        squares[i].classList.remove("hidden");
    }
    else {
        squares[i].classList.add("hidden");
    }
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
             reset.textContent = "Play Again?"
             console.log("heading background ", heading.style.backgroundColor)
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
   //console.log("what is returned in getRandomColor: rgb("+red+", "+green+", "+blue+")");
   return ("rgb("+red+", "+green+", "+blue+")");

   
}

const setLevel = (level) => {
    if (level === "hard") {
        return num = 6;
    }
    else if (level === "easy") {
        return num = 3;
    }

}



const init = () => {
    
    setField();

    //reset button event listener
    reset.addEventListener("click", ()=> {
            setField();
    })
    
    
    
    //mode buttons event listeners
    modeBtns.forEach((button)=> {
      
        button.addEventListener("click", ()=> {
            console.log(button)
            level === "easy" ? level ="hard": level="easy";
            modeBtns.forEach((b)=>b.classList.toggle("selected"));
            setField();
            return level; 
       })
    })
}

init();