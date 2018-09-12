(function() {
	
	// Begin Array.
	var taskList = [];

	//fn() to create task Obj.
	function task(task, completed) {
		this.task = task;
		this.completed = completed;
	}

	// Variable to get value of input.
	var addTodo = document.getElementById('addTodo');

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
		}
	});

})(); // End IIFE

