let p1score = Number(document.getElementById("p1").innerHTML);
let p2score = Number(document.getElementById("p2").innerHTML);
const buttonP1 = document.querySelector("#player1");
const buttonP2 = document.querySelector("#player2");

buttonP1.addEventListener("click", ()=> {
  p1score +=1; 
  console.log(p1score, p2score)
})

buttonP2.addEventListener("click", ()=> {
    p2score +=1; 
    console.log(p1score, p2score)
  })