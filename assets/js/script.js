let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

//Function to create list item on button click
let createTaskHandler = function() {
    //prevent auto refresh on submit
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Create new line item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    //Add html to div
    taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

//on click add new task item
formEl.addEventListener("submit", createTaskHandler);
