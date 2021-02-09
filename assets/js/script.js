let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

//Function to create list item on button click
let createTaskHandler = function() {
    //prevent auto refresh on submit
    event.preventDefault();

    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

//on click add new task item
formEl.addEventListener("submit", createTaskHandler);
