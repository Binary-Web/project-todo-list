let projectList = [];
class Project {
    constructor(name, tasks) {
        this.name = name;
        this.availableTasks = [];
        this.fnishedTasks = [];
    }
}

class Tasks {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
        this.isDone = isDone;
    }
}

function addProject(name) {

}
const btnAddProject = document.querySelector('.btn-add-project');
const btnAddTask = document.querySelector('.btn-add-task');

btnAddTask.addEventListener('click', () => {
    const modalContainer = document.querySelector('.modal-container');
    const modalAddTask = document.querySelector('.modal-add-task');

    modalContainer.classList.add('active');
    modalAddTask.classList.add('modal-active');
});

btnAddProject.addEventListener('click', () => {
    const modalContainer = document.querySelector('.modal-container');
    const modalAddProject = document.querySelector('.modal-add-project');

    modalContainer.classList.add('active');
    modalAddProject.classList.add('modal-active');
});

function makeAddProjectForm(newProject) {
    //adding proiject
}

function addTaskToProject(project, task) {
    //adding task to project;
}

function updateTask(project, task) {
    //done task
}

function deleteProject(project) {
    //delete project
}

function deleteTask(project, task) {
    //delete task
} 