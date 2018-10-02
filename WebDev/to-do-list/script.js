var todos = [];

var input = prompt("What would you like to do?");

while (input !=="quit") {
    if (input === "list") {
    console.log(todos);
} else if (input ==="new") {
  var newTask = prompt("Enter new task");
  todos.push(newTask);
  console.log(todos);
}
  input = prompt("What would you like to do?");
}
console.log("Today's tasks: ", todos)
console.log("You've quit the app!")