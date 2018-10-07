let p1score = 0;
let p2score = 0;
let p1display = document.querySelector("#p1display");
let p2display = document.querySelector("#p2display");
const buttonP1 = document.querySelector("#player1");
const buttonP2 = document.querySelector("#player2");
const buttonRe = document.querySelector("#reset");
const scoreInput = document.getElementById("score") 
let scoreDisplay = 5;


buttonP1.addEventListener("click", ()=> {
  if (p1score < Number(scoreDisplay)) 
  {
      p1score++; 
      p1display.textContent = p1score;
  } else {
      p1display.classList.add("winner");
      p2display.classList.remove("winner");
      alert("Player 1 wins!")
      p1score =0;
      p1display.textContent = p1score;
      p2score =0;
      p2display.textContent = p2score;
  }
})

buttonP2.addEventListener("click", ()=> {
   if (p2score < Number(scoreDisplay) ) 
   {
       p2score++; 
       p2display.textContent = p2score;
   } else 
   {
      p2display.classList.add("winner");
      p1display.classList.remove("winner");
      alert("Player 2 wins!")
      p1score =0;
      p1display.textContent = p1score;
      p2score =0;
      p2display.textContent = p2score;
}
  })

buttonRe.addEventListener("click", ()=> {
    if (window.confirm("Are you sure you want to reset the score?")) {
        p1score =0;
        p1display.textContent = p1score;
        p2score =0;
        p2display.textContent = p2score;
    }
})

scoreInput.addEventListener("change", ()=>{
    document.querySelector("#scoreDisplay").textContent = scoreInput.value; //or this.scoreInput.value
    scoreDisplay = scoreInput.value;                                        //or this.scoreInput.value
    
})