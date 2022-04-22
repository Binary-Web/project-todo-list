
let projectList = [];

let indexOfSelectedProject = "";
const btnModalAddProject = document.querySelector('.btn-add-project');
const addProjectModalForm = document.querySelector('.project-form');

const btnModalAddTask = document.querySelector('.modal-btn-add-task')

const modalContainer = document.querySelector('.modal-container');
const modalAddTask = document.querySelector('.modal-add-task');
const modalAddProject = document.querySelector('.modal-add-project');
const modalEditTask = document.querySelector('.modal-edit-task');

const btnCancel = document.querySelectorAll('.btn-cancel');
const btnAddProject = document.querySelector('.modal-btn-add-project');



const mainDiv = document.querySelector('.tasks')



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
    modalAddProject.style.display = "none";
    modalEditTask.style.display = "none"

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
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('btn-project-delete');
    deleteButton.innerHTML = `<span class="mdi mdi-close"></span>`;
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        deleteProject(key);
    })
    projectCard.classList.add('card-project');
    projectCard.setAttribute('key', key);
    projectCard.innerText = title;
    projectCard.appendChild(deleteButton);
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


function loadTask(key, test = false) {
    mainDiv.innerHTML = "";
    indexOfSelectedProject = key;

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

const addTaskModalForm = document.querySelector('.task-form');

        addTaskModalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('submit submit submit')
            addTasktoProject(indexOfSelectedProject);
});

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
    taskCard.addEventListener('click', () => {
        editTask(key, index);
    })
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


class Task {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }
}
class Project {
    constructor(title) {
        this.title = title;
        this.availableTasks = [];
        this.finishedTasks = [];
    }
}

btnAddProject.addEventListener('click', addProjectObject);
addProjectModalForm.addEventListener('submit', addProjectObject);



// TODO LIST FUNCTIONS
function addTasktoProject(key) {
    const taskName = document.querySelector('#taskName');
    const taskPriority = document.querySelector('#priority');

    projectList[key].availableTasks.push(new Task(taskName.value, taskPriority.value));
    console.log(projectList)
    closeModal();
    loadTask(key);
    taskName.value = "";
    taskPriority.value = "low"
}

function deleteProject(key) {
    // projectList.slice(key, 1);
    // console.log(projectList)
    // loadProject();
    console.log("ASDASD")
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
function updateTask(taskIndex, projectIndex) {
    const temp = projectList[projectIndex].availableTasks[taskIndex];
    projectList[projectIndex].availableTasks.splice(taskIndex, 1);

    projectList[projectIndex].finishedTasks.push(temp)
    console.log(projectList);
    loadTask(projectIndex);
}


function deleteTask(category, taskIndex, projectIndex) {
    if(category === "available") {
        projectList[projectIndex].availableTasks.splice(taskIndex, 1);
    } else if (category === "finished") {
        projectList[projectIndex].finishedTasks.splice(taskIndex, 1);
    }
    loadTask(projectIndex)
} 

function editTask(projectIndex, taskIndex) {
    console.log(projectList[projectIndex].availableTasks[taskIndex]);
    const editTaskName = document.querySelector('#editTaskName');
    const editPriority = document.querySelector('#editPriority');
    editTaskName.value = projectList[projectIndex].availableTasks[taskIndex].name;
    editPriority.value = projectList[projectIndex].availableTasks[taskIndex].priority
    modalContainer.style.display = "flex";
    modalEditTask.style.display = "grid";

    const editTaskForm = document.querySelector('.edit-task-form');
    editTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("SUBMIT EDIT TASK")
        projectList[projectIndex].availableTasks[taskIndex].availableTasks = editTaskName.value;
        projectList[projectIndex].availableTasks[taskIndex].priority = editPriority.value;
        loadTask(projectIndex);
        closeModal()
    })
}