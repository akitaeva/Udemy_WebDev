let todos = [];

setTimeout( ()=> {
    let input = prompt("What would you like to do?");

    while (input !=="quit") {
        //getting the list of todos
         if (input === "list") {
            listToDos();
          } 
          //adding a new todo
          else if (input ==="new") {
            addToDo();
          }
          //deleting a todo
          else if (input ==="delete") {
            deleteToDo();    
          }
      input = prompt("What else would you like to do?");
    }
    
    console.log("You've quit the app!")
}, 500);


const listToDos = () =>{
    console.log("===========");
    todos.forEach((todo, i)=>{
       console.log( (i+1) + ". "+ todo);
    });
    console.log("===========");
}

const addToDo = () => {
    var newTask = prompt("Enter new task");
    todos.push(newTask);
    console.log(todos);
}

const deleteToDo = () => {
    const taskNum = prompt("What is the task's number?");
    todos.splice(taskNum-1, 1)
    console.log("Deleted the task. Task left: " ,todos);  
}

let button = document.querySelector("button")
button.addEventListener("click", ()=> {
    if ( document.body.style.background !== "limegreen"){
        document.body.style.background = "limegreen"
    }
    else {
        document.body.style.background = "pink"
    }
})

//==========================================================

var ToDOlis = document.querySelectorAll(".todos");
console.log("what is firstToDOli: " , ToDOlis); 

ToDOlis.forEach( (todo) => {
    todo.addEventListener("mouseover", ()=> {
        todo.style.color = "darkgreen"
    })
}); 

ToDOlis.forEach( (todo) => {
    todo.addEventListener("mouseout", ()=> {
        todo.style.color = "black"
    })
}); 

