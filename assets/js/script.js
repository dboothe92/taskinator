let taskIdCounter = 0;
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");

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
    let listItemEl = document.createElement("li");
    listItemEl.className = ("task-item");

    //Add task id as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //Add entire list item to list
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    //Increase counter for next id
    taskIdCounter++;
};

let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //drop down menu
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    //create dropdown options
    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    };

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

//function to handle buttons clicks in side tasks
let taskButtonHandler = function (event) {
    console.log(event.target);

    if (event.target.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//delete task function 
let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");
    taskSelected.remove();
};

//on click add new task item
formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);