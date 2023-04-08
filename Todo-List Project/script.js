// Feature adding Buttons
const addTaskButton = document.querySelector('#add-task-button');

const completeAllTasksButton = document.querySelector('#complete-all-tasks');
const clearCompletedButton = document.querySelector('#clear-completed');

const showAll = document.querySelector('#show-all');
const showCompleted = document.querySelector('#show-completed');
const remaining = document.querySelector('#remaining');

// Containers
const taskInput = document.querySelector('#task-input');
const listContainer = document.querySelector('#todo-list');
const countContainer = document.querySelector('#count');

// Set item into localStorage
const setItems = (items) => {
	const itemsJSON = JSON.stringify(items);

	localStorage.setItem('todo-items', itemsJSON);
};

// Get items from local Storage
const getItems = () => {
	const value = localStorage.getItem('todo-items') || '[]';

	return JSON.parse(value);
};

let tasks = getItems();

// Add Task to DOM
const addTasksToDOM = (tasks) => {
	taskInput.value = '';
	listContainer.innerHTML = '';

	// Sort TODO items based on its completion status
	tasks.sort((a, b) => {
		if (a.isCompleted) {
			return 1;
		}

		if (b.isCompleted) {
			return -1;
		}

		return a.text < b.text ? -1 : 1;
	});


// Create li tags in list and pass the values in it 

	for (let i = 0; i < tasks.length; i++) {
		const li = document.createElement('li');

		li.innerHTML = `
			<input type="checkbox" onchange="toggleTask('${tasks[i].id}')" 
			id="${tasks[i].id}" class=${tasks[i].isCompleted ? 'checked' : ''}>
      
			<label for="${tasks[i].id}">
        <span class="custom-checkbox"><span></span></span>
        <span class="text">${tasks[i].text}</span>
      </label>
      
			<span class="delete-task-button" onclick="deleteTask('${tasks[i].id}')">
				<i class='bx bx-x-circle'></i>
			</span>
		`;

		listContainer.append(li);
	}
};


//
const applychanges = () => {
	setItems(tasks);

	let completedTasks = tasks.filter((task) => {
		return task.isCompleted;
	});

	let uncompletedTasks = tasks.filter((task) => {
		return !task.isCompleted;
	});

	countContainer.innerText = uncompletedTasks.length;

	// Insert every TODO items into todo-list
	showAll.addEventListener('click', () => {
		showAll.style.color = 'var(--active-color)';
		showCompleted.style.color = 'var(--secondary-color)';
		remaining.style.color = 'var(--secondary-color)';

		addTasksToDOM(tasks);
	});

	showCompleted.addEventListener('click', () => {
		showAll.style.color = 'var(--secondary-color)';
		showCompleted.style.color = 'var(--active-color)';
		remaining.style.color = 'var(--secondary-color)';

		addTasksToDOM(completedTasks);
	});

	remaining.addEventListener('click', () => {
		showAll.style.color = 'var(--secondary-color)';
		showCompleted.style.color = 'var(--secondary-color)';
		remaining.style.color = 'var(--active-color)';

		addTasksToDOM(uncompletedTasks);
	});

	addTasksToDOM(tasks);
};

applychanges();

// Functions of ToDo List Project

// Add item
const addTask = (task) => {
	tasks.unshift(task);

	applychanges();
};

// Toggle item
const toggleTask = (taskId) => {
	const task = tasks.filter((task) => {
		return task.id === taskId;
	});

	const currentTask = task[0];
	currentTask.isCompleted = !currentTask.isCompleted;

	applychanges();
	return;
};

// Delete item
const deleteTask = (taskId) => {
	const newTasks = tasks.filter((task) => {
		return task.id !== taskId;
	});

	tasks = newTasks;

	applychanges();
	return;
};

// Complete All Tasks
completeAllTasksButton.addEventListener('click', () => {
	tasks.forEach((task) => {
		task.isCompleted = true;
	});

	applychanges();
	return;
});

// Clear Completed Tasks
clearCompletedButton.addEventListener('click', () => {
	const newTasks = tasks.filter((task) => {
		return !task.isCompleted;
	});
	tasks = newTasks;

	applychanges();
	return;
});

// Create Object Template
const obj = (text) => {
	const task = {
		id: Date.now().toString(),
		isCompleted: false,
		text,
	};

	return task;
};

// Adding task with Click
addTaskButton.addEventListener('click', () => {
	let value = taskInput.value;

	if (value) {
		const task = obj(value);
		addTask(task);
	}
	return;
});

// If enter is pressed by User
const handleInput = (e) => {
	// Adding task 
	let value = e.target.value;

	if (e.key === 'Enter') {
		if (value) {
			const task = obj(value);
			addTask(task);
		}
		return;
	}
};


// If enter is pressed by User
taskInput.addEventListener('keyup', handleInput);