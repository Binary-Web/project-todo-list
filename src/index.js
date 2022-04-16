
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

const addProjectModalForm = document.querySelector('.project-form')
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

function loadTasksContainers() {
    mainDiv.innerHTML = "";
    //AVAIBLE TASKS -----------------------------------------


}

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
        card.addEventListener('click', projectCardSelect)
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
    });



    tasksList.appendChild(containerTitle);
    tasksList.appendChild(divTaskListContainer);
    tasksList.appendChild(divBtnAddTask);



    mainDiv.appendChild(tasksList);

    //FINISHED TASKS;
    const divFinishedTasks = document.createElement('div');
    divFinishedTasks.classList.add('finished-tasks');

    containerTitle.innerText = "Finished Tasks";

    const divFinishedTasksListContainer = document.createElement('div');
    divFinishedTasksListContainer.classList.add('finished-taskslist-container');

    divFinishedTasks.appendChild(containerTitle);
    divFinishedTasks.appendChild(divFinishedTasksListContainer);


   
    divTaskListContainer.innerHTML = "";
    divFinishedTasksListContainer.innerHTML = ""
    const projectTitle = projectList[key].title;
    const availableTasks = projectList[key].availableTasks;
    const finishedTasks = projectList[key].finishedTasks;
    availableTasks.forEach(aTask => {
        const task = createAvailableTaskCards(aTask.name, aTask.priority);
        divTaskListContainer.appendChild(task);
    });
    finishedTasks.forEach(fTask => {
        const task = createFinishedTaskCards(fTask.name, fTask.priority);
        divFinishedTasksListContainer.appendChild(task);
    })

}

function createFinishedTaskCards(name, priority) {
    const taskCard = document.createElement('div');

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');

    //FOR X ICON FOR DELETING TASKS
    const btnDeleteText = document.createElement('span');
    btnDeleteText.classList.add('mdi');
    btnDeleteText.classList.add('mdi-close');
    btnDelete.append(btnDeleteText);

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

function createAvailableTaskCards(name, priority) {
    const taskCard = document.createElement('div');

    const btnDone = document.createElement('button');
    btnDone.classList.add('btn-done');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');

    //FOR X ICON FOR DELETING TASKS
    const btnDeleteText = document.createElement('span');
    btnDeleteText.classList.add('mdi');
    btnDeleteText.classList.add('mdi-close');
    btnDelete.append(btnDeleteText);
    btnDone.innerHTML = "Done";

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
class Tasks {
    constructor(name, priority) {
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

// function updateTask(project, task) {
//     //done task
// }

// function deleteProject(project) {
//     //delete project
// }

// function deleteTask(project, task) {
//     //delete task
// } 