window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', () => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', async () => {
			list_el.removeChild(task_el);
			try {
				const deleteResponse = await fetch(`https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo/${taskId}`, {
					method: 'DELETE',
				});

				if (!deleteResponse.ok) {
					console.error('Failed to delete task on the server.');
				}
			} catch (error) {
				console.error('Error deleting task:', error);
			}
		});

		try {
			const postResponse = await fetch('https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					task: task,
				}),
			});

			if (!postResponse.ok) {
				console.error('Failed to save task on the server.');
			}
		} catch (error) {
			console.error('Error saving task:', error);
		}
	});

	fetchAndDisplayTasks();

	async function fetchAndDisplayTasks() {
		try {
			const response = await fetch('https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo');
			if (response.ok) {
				const tasks = await response.json();
				tasks.forEach((item) => {
					const task_el = createTaskElement(item);
					list_el.appendChild(task_el);
				});
			} else {
				console.error('Failed to fetch tasks from the server.');
			}
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	}

	function createTaskElement(taskData) {
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = taskData.task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		task_edit_el.addEventListener('click', () => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
				updateTaskOnServer(taskData._id, task_input_el.value);

			}
		});

		task_delete_el.addEventListener('click', async () => {
			list_el.removeChild(task_el);
			try {
				const deleteResponse = await fetch(`https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo/${taskData._id}`, {
					method: 'DELETE',
				});

				if (!deleteResponse.ok) {
					console.error('Failed to delete task on the server.');
				}
			} catch (error) {
				console.error('Error deleting task:', error);
			}
		});

		return task_el;
	}

	async function updateTaskOnServer(taskId, updatedTask) {
		try {
			const updateResponse = await fetch(`https://crudcrud.com/api/c78e9c1f83564740988b8a66216feb4e/todo/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					task: updatedTask,
				}),
			});

			if (!updateResponse.ok) {
				console.error('Failed to update task on the server.');
			}
		} catch (error) {
			console.error('Error updating task:', error);
		}
	}
});
