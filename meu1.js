const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const markAllCompletedBtn = document.getElementById('mark-all-completed-btn');
const deleteAllTasksBtn = document.getElementById('delete-all-tasks-btn');
const orderByPriorityBtn = document.getElementById('order-by-priority-btn');
const filterByStatusBtn = document.getElementById('filter-by-status-btn');
const listTasksBtn = document.getElementById('list-tasks-btn');
const taskListDisplay = document.getElementById('task-list-display');

let tasks = [];

// Carregar tarefas do armazenamento local
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            completed: false,
            priority: 0
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
        // Armazenar tarefas no armazenamento local
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.textContent = task.text;
        if (task.completed) {
            taskElement.className += ' completed';
        }
        const completionPercentage = document.createElement('span');
        completionPercentage.textContent = `${task.completed ? ' (Adicionado)ㅤ' : 'ㅤ(Comprar)ㅤ'}`;
        completionPercentage.style.color = task.completed ? 'blue' : 'red';
        taskElement.appendChild(completionPercentage);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Deletar da Compra';
        deleteBtn.style.margin = '5px';
        deleteBtn.style.border = '10px';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
            // Atualizar armazenamento local
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskElement.appendChild(deleteBtn);
        taskElement.addEventListener('click', () => {
            task.completed = true;
            renderTasks();
            // Atualizar armazenamento local
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskList.appendChild(taskElement);
    });
}

markAllCompletedBtn.addEventListener('click', () => {
    tasks.forEach((task) => {
        task.completed = true;
    });
    renderTasks();
    // Atualizar armazenamento local
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

deleteAllTasksBtn.addEventListener('click', () => {
    tasks = [];
    renderTasks();
    // Atualizar armazenamento local
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

orderByPriorityBtn.addEventListener('click', () => {
    tasks.sort((a, b) => {
        if (a.priority > b.priority) {
            return 1;
        } else if (a.priority < b.priority) {
            return -1;
        } else {
            return 0;
        }
    });
    renderTasks();
});

filterByStatusBtn.addEventListener('click', () => {
    const filterStatus = document.getElementById('filter-status').value;
    if (filterStatus === 'concluídas') {
        tasks = tasks.filter((task) => task.completed);
    } else if (filterStatus === 'não concluídas') {
        tasks = tasks.filter((task) => !task.completed);
    }
    renderTasks();
});

listTasksBtn.addEventListener('click', listTasks);

function listTasks() {
    let taskListHTML = '<ul>';
    tasks.forEach((task) => {
        taskListHTML += `<li${task.completed ? ' class="completed"' : ''}>${task.text}</li>`;
    });
    taskListHTML += '</ul>';
    taskListDisplay.innerHTML = taskListHTML;
}

renderTasks();
