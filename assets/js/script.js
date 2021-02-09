let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

//Function to create list item on button click
let taskFormHandler = function(event) {
    //prevent auto refresh on submit
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    //validate input
    if (!taskNameInput || !taskTypeInput) {
        alert("Please fill out the task form!");
        return false;
    }
    formEl.reset();

   //Package as an object
   let taskDataObj = {
       name: taskNameInput,
       type: taskTypeInput
   };

   //send as argument
   createTaskEl(taskDataObj);
};

let createTaskEl = function(taskDataObj) {
    //Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = ("task-item");

    //Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

//on click add new task item
formEl.addEventListener("submit", taskFormHandler);
