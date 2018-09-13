(function() {
	
	// Begin Array.
	var taskList = [];

	// Document Variables.
	var todo = document.getElementById('addTodo');
	var list = document.getElementById('list');

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
		list.appendChild(li);
	}

	function saveEdit(taskId, value) {
		var updateTask = document.getElementById(taskId);
		updateTask.innerHTML = value;
		var index = parseInt(taskId);
		taskList[index].task = value;
	}

	function editTask(taskId) {
		var edit = document.getElementById(taskId);
		// Save variable to IIFE Scope, so that it can be used to save a value if a user 'clicks' off the input.
		var editTask = '<input id="inp-' + taskId + '" class="task-input task" value="' + tmpValueObj.value + '" />';
		edit.innerHTML = editTask;
		var newInput = document.getElementById('inp-' + taskId);
		newInput.focus();

		var toDoLoop = document.getElementsByClassName('task-input');

		for(var i = 0; i<toDoLoop.length; i++) {
			var tmpId = toDoLoop[i].id.replace(/[a-z]+\-/g, '');
			var tmpVal = toDoLoop[i].value;
			if(tmpId !== taskId) {
				saveEdit(tmpId, tmpVal);
			}
		}
		console.log('tod ', toDoLoop);
	} 

	// Listening for "enter" key to be pressed.
	document.addEventListener("keyup", function(event) {
		var getClassList = event.target.classList;
		//Replace Alphanumerical Characters to get the index from the input - pattern would not affect addTodo.
		var getId = event.target.id.replace(/[a-z]+\-/g, '');
		var getValue = event.target.value;

		if(event.keyCode === 13) {
			if(getId === 'addTodo') {

				// Create task Object
				var newTask = new task(getValue, false);
				// Push newTask into the array (at the end).
				taskList.push(newTask);
				// Clear Value for next Input.
				todo.value = '';
				var taskIndex = taskList.length - 1;
				addLi(newTask, taskIndex);
			} else if(getClassList.contains('task-input')) {
				saveEdit(getId, getValue);
			}

		} else if (event.keyCode !== 13 && getClassList.contains('task-input')) {
			// Update tmpValueObj to track changes... Maybe I should disallow this? UX question.
			tmpValueObj = {
				value: getValue,
				ind: getId
			};
		}
	});

	// Listening for "dblClick" on li.
	list.addEventListener('dblclick', function(event) {
		var getClassList = event.target.classList;
		var getId = event.target.id;
		if(getClassList.contains('task-item')) {
			editTask(getId);
		}
	});

})(); // End IIFE
