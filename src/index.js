
let projectList = [
    {
        title: "HELLO",
        availableTasks: [
            {
                name: "TASK 1",
                priority:  "medium"
            },
            {
                name: "TASK 2",
                priority: "high"
            }
        ],
        finishedTasks: [
            {
                name: "FINISHED TASK 3",
                priority: "low"
            },
            {
                name: "FINISHED TASK 4",
                priority: "medium"
            } 
        ]
    },
    {
        title: "WORLD",
        availableTasks: [
            {
                name: "WROLD TASK 1",
                priority:  "low"
            },
            {
                name: "WORLD TASK 2",
                priority: "medium"
            }
        ],
        finishedTasks: [
            {
                name: "WORLD FINISHED TASK 3",
                priority: "low"
            },
            {
                name: "WORLD FINISHED TASK 4",
                priority: "high"
            } 
        ]
    },
    {
        title: "TESTING",
        availableTasks: [
            {
                name: "TESTING TASK 1",
                priority:  "high"
            },
            {
                name: "TESTING TASK 2",
                priority: "low"
            }
        ],
        finishedTasks: [
            {
                name: "TESTING FINISHED TASK 3",
                priority: "medium"
            },
            {
                name: "TESTING FINISHED TASK 4",
                priority: "medium"
            } 
        ]
    }
];


const btnModalAddProject = document.querySelector('.btn-add-project');
const addProjectModalForm = document.querySelector('.project-form');

const addTaskModalForm = document.querySelector('.task-form');
const btnModalAddTask = document.querySelector('.modal-btn-add-task')

const modalContainer = document.querySelector('.modal-container');
const modalAddTask = document.querySelector('.modal-add-task');
const modalAddProject = document.querySelector('.modal-add-project');

const btnCancel = document.querySelectorAll('.btn-cancel');
const btnAddProject = document.querySelector('.modal-btn-add-project');



const mainDiv = document.querySelector('.tasks')
function loadTasksArea() {
    const h1Message = document.createElement('h1');
    h1Message.classList.add('task-message');
    
    mainDiv.append(h1Message);
}
loadTasksArea();


btnModalAddProject.addEventListener('click', () => {
    modalContainer.style.display = "flex";
    modalAddProject.style.display = "grid";
});

//CLOSING THE MODAL
window.addEventListener('click', (e) => {
    if(e.target == modalContainer) {
        closeModal()
    }
})
btnCancel.forEach(btn => btn.addEventListener('click', closeModal));
function closeModal() {
    modalContainer.style.display = "none";
    modalAddTask.style.display = "none";
    modalAddProject.style.display = "none";;
}

// WHEN SELECTINGA PROJECT CARD
function projectCardSelect(event) {

    const projectCards = document.querySelectorAll('.card-project');
    projectCards.forEach(card => card.classList.remove('project-active'))
    const activeProject = event.target;
    activeProject.classList.add('project-active');

    loadTask(activeProject.getAttribute("key"));
    
}
function createProjectCard(title, key) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('card-project');
    projectCard.setAttribute('key', key);
    projectCard.innerText = title;
    return projectCard;
}

// LOAD ALL PROJECTS
function loadProject() {
    const projectListContainer = document.querySelector('.project-list');
    projectListContainer.innerHTML = "";
    projectList.forEach((project, index) => {
        const card = createProjectCard(project.title, index);
        projectListContainer.appendChild(card);
        card.addEventListener('click', projectCardSelect);
    })
}

loadProject()


let firstSelectedProject = true;
function loadTask(key) {
    if (firstSelectedProject === true) {
        mainDiv.innerHTML = ""
    }
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');


    //AVAIABLE TASKS
    const containerTitle = document.createElement('h3');
    containerTitle.innerText = "Avaible Tasks";

    const divTaskListContainer = document.createElement('div');
    divTaskListContainer.classList.add('taskslist-container');

    const divBtnAddTask = document.createElement('div');
    divBtnAddTask.classList.add('btn-add-task')
    divBtnAddTask.innerText = "Add Tasks";
    divBtnAddTask.addEventListener('click', () => {
        modalContainer.style.display = "flex";
        modalAddTask.style.display = "grid";

        
        addTaskModalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addTasktoProject(key);
        });
        btnModalAddTask.addEventListener('click', (event) => {
            event.preventDefault();
            addTasktoProject(key)
        })
        
    });

    tasksList.append(containerTitle);
    tasksList.appendChild(divTaskListContainer);
    tasksList.appendChild(divBtnAddTask);



    mainDiv.appendChild(tasksList);

    //FINISHED TASKS;
    const divFinishedTasks = document.createElement('div');
    divFinishedTasks.classList.add('finished-tasks');

    const finishedContainerTitle = document.createElement('h3');
    finishedContainerTitle.classList.add('task-category')
    finishedContainerTitle.innerText = "Finished Tasks";

    const divFinishedTasksListContainer = document.createElement('div');
    divFinishedTasksListContainer.classList.add('finished-tasklist-container');

    divFinishedTasks.appendChild(finishedContainerTitle);
    divFinishedTasks.appendChild(divFinishedTasksListContainer);

    //APPENDING THE TASKS
    divTaskListContainer.innerHTML = "";
    divFinishedTasksListContainer.innerHTML = ""
    const projectTitle = projectList[key].title;
    const availableTasks = projectList[key].availableTasks;
    const finishedTasks = projectList[key].finishedTasks;
    availableTasks.forEach((aTask, index) => {
        const task = createAvailableTaskCards(aTask.name, aTask.priority, index, key);
        divTaskListContainer.appendChild(task);
    });
    finishedTasks.forEach((fTask, index) => {
        const task = createFinishedTaskCards(fTask.name, fTask.priority, index, key);
        divFinishedTasksListContainer.appendChild(task);
    })

    mainDiv.appendChild(divFinishedTasks)

}

function createFinishedTaskCards(name, priority, index, key) {
    const taskCard = document.createElement('div');

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');

    //FOR X ICON FOR DELETING TASKS
    const btnDeleteText = document.createElement('span');
    btnDeleteText.classList.add('mdi');
    btnDeleteText.classList.add('mdi-close');
    btnDelete.append(btnDeleteText);
    btnDelete.addEventListener('click', () => {
        deleteTask("finished", index, key);
    })

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');
    btnGroup.appendChild(btnDelete);

    taskCard.classList.add('card-task');
    taskCard.classList.add(priority);
    const taskName = document.createElement('p');
    taskName.innerText = name;
    taskCard.appendChild(taskName);
    taskCard.appendChild(btnGroup)

    return taskCard;
}

function createAvailableTaskCards(name, priority, index, key) {
    const taskCard = document.createElement('div');

    const btnDone = document.createElement('button');
    btnDone.classList.add('btn-done');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');
    btnDone.innerHTML = "Done";
    btnDone.addEventListener('click', () => {
        updateTask(index, key);
    })

    //FOR X ICON FOR DELETING TASKS
    const btnDeleteText = document.createElement('span');
    btnDeleteText.classList.add('mdi');
    btnDeleteText.classList.add('mdi-close');
    btnDelete.append(btnDeleteText);

    btnDelete.addEventListener('click', () => {
        deleteTask("available", index, key)
    })
    

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');
    btnGroup.appendChild(btnDone);
    btnGroup.appendChild(btnDelete);

    taskCard.classList.add('card-task');
    taskCard.classList.add(priority);
    const taskName = document.createElement('p');
    taskName.innerText = name;
    taskCard.appendChild(taskName);
    taskCard.appendChild(btnGroup)
    return taskCard;
}


// TODO LIST FUNCTIONS
class Task {
    constructor(name, priority, isDone) {
        this.name = name;
        this.priority = priority;
        this.isDone = isDone;
    }
}
class Project {
    constructor(title) {
        this.title = title;
        this.availableTasks = [];
        this.finishedTasks = [];
    }
    addTaskToProject(newTask) {
        //addtask
    }
    updateTask(task) {
        //updatetask
    }
    deleteTask(task) {
        //deleete task
    }
}

btnAddProject.addEventListener('click', addProjectObject);
addProjectModalForm.addEventListener('submit', addProjectObject);


function addTasktoProject(key) {
    const taskName = document.querySelector('#taskName').value;
    const taskPriority = document.querySelector('#priority').value;
    const newTask = new Task(taskName, taskPriority, false)

    projectList[key].availableTasks.push(newTask);
    closeModal()
    loadTask(key)
}


function addProjectObject(event) {
    event.preventDefault();
    const projectTitle = document.querySelector('#projectTitle').value;
    if(projectTitle !== null || projectTitle !== "") {
        projectList.push(new Project(projectTitle));
        closeModal();
        loadProject();
    };
}

// function addProject(projectTitle) {
//     projectList.push(projectTitle)
// }

// function makeAddProjectForm(newProject) {
//     //adding proiject
// }

// function addTaskToProject(project, task) {
//     //adding task to project;
// }

function updateTask(taskIndex, projectIndex) {

    const temp = projectList[projectIndex].availableTasks[taskIndex];
    projectList[projectIndex].availableTasks.splice(taskIndex, 1);

    projectList[projectIndex].finishedTasks.push(temp)
    console.log(projectList);
    loadTask(projectIndex);
}

// function deleteProject(project) {
//     //delete project
// }

function deleteTask(category, taskIndex, projectIndex) {
    if(category === "available") {
        projectList[projectIndex].availableTasks.splice(taskIndex, 1);
    } else if (category === "finished") {
        projectList[projectIndex].finishedTasks.splice(taskIndex, 1);
    }
    loadTask(projectIndex)
} 