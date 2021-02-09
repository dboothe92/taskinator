let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");

//Function to create list item on button click
let createTaskHandler = function() {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

//on click add new task item
buttonEl.addEventListener("click", createTaskHandler);
