
let projectList = [];


//these are buttons to show the modal forms
const btnModalAddProject = document.querySelector('.btn-add-project');
const btnModalAddTask = document.querySelector('.btn-add-task');

const addProjectModalForm = document.querySelector('.project-form')
const modalContainer = document.querySelector('.modal-container');
const modalAddTask = document.querySelector('.modal-add-task');
const modalAddProject = document.querySelector('.modal-add-project');

const btnCancel = document.querySelectorAll('.btn-cancel');
const btnAddProject = document.querySelector('.modal-btn-add-project');


btnModalAddTask.addEventListener('click', () => {
    modalContainer.style.display = "flex";
    modalAddTask.style.display = "grid";
});

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

// LOAD ALL PROJECTS
function loadProject() {
    const projectListContainer = document.querySelector('.project-list');
    projectListContainer.innerHTML = "";
    projectList.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectListContainer.appendChild(card);
    })
}

function createProjectCard(title, key) {
    const projectCard = document.createElement('div');
    projectCard.setAttribute('key', key);
    projectCard.classList.add('card-project');
    const projectTitle = document.createElement('h2');
    projectTitle.innerText = title;
    projectCard.append(projectTitle);
    return projectCard;
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
        const newProject = new Project(projectTitle);
        projectList.push(projectTitle);
        closeModal();
        loadProject();
        console.log(newProject)
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