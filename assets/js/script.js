let taskIdCounter = 0;
let formEl = document.querySelector("#task-form");
let pageContentEl = document.querySelector("#page-content");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let tasks = [];

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

    //See if form is editing ar adding new task.
    let isEdit = formEl.hasAttribute("data-task-id");

    //has data attribute, get task id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);

    //no data attribute, so create object as normal and pass to createTaskEl function
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
};

//creates a new task
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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    //Increase counter for next id
    taskIdCounter++;
    saveTasks();
};

//creates button in tasks
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

//function to handle buttons clicks inside tasks
let taskButtonHandler = function (event) {
    //get target element
    let targetEl = event.target;

    //if edit button is clicked
    if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//edit task function
let editTask = function(taskId) {
    //get task list from element
    let taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId +"']");

    //get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name = 'task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

//completes task edits
let completeEditTask = function(taskName, taskType, taskId) {
    //find matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated");

    //reset fotm to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    saveTasks();
};

//delete task function 
let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");
    taskSelected.remove();

    //create a new array to hold updated list of tasks
    let updatedTaskArr = [];

    //loop through current tasks
    for (let i = 0; i < tasks.length; i++) {
        //if id doesn't match keep it in array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //update tasks array
    tasks = updatedTaskArr;
    saveTasks();
};

//function to change the status of a task
let taskStatusChangeHandler = function(event) {
    //get task item id
    let taskId = event.target.getAttribute("data-task-id");

    //get curently selected options value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on id
    let taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

//Save to local storage
let saveTasks = function() {
   localStorage.setItem("tasks", JSON.stringify(tasks)); 
};

//on click add new task item
formEl.addEventListener("submit", taskFormHandler);

//runs correct function for edit and delete button in tasks
pageContentEl.addEventListener("click", taskButtonHandler);

//update status of tasks
pageContentEl.addEventListener("change", taskStatusChangeHandler);

