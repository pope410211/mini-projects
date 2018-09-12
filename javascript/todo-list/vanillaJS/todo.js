(function() {
	
	// Begin Array.
	var taskList = [];

	// Document Variables.
	var addTodo = document.getElementById('addTodo');
	var ulList = document.getElementById('list');

	//fn() to create task Obj.
	function task(task, completed) {
		this.task = task;
		this.completed = completed;
	}

	//fn() to add list item.
	function addLi(text, ind) {
		var li = document.createElement('li');
		var liText = document.createTextNode(text.task);
		li.appendChild(liText);
		li.setAttribute('id', ind);
		li.setAttribute('class', 'task-item');
		ulList.appendChild(li);
	}
	// Listening for "enter" key to be pressed.
	addTodo.addEventListener("keyup", function() {
		if(event.keyCode == 13) {
			// Create task Onject
			var newTask = new task(addTodo.value, false);
			// Push newTask into the array (at the end).
			taskList.push(newTask);
			// Clear Value for next Input.
			addTodo.value = '';
			console.log('taskList ', taskList);
			var taskIndex = taskList.length - 1;
			addLi(newTask, taskIndex);
		}
	});

})(); // End IIFE

