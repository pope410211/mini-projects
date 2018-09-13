(function() {
	
	// Begin Array.
	var taskList = [];	
	// Document Variables.
	var todo = document.getElementById('addTodo');
	var list = document.getElementById('list');
	var toDoLoop = document.getElementsByClassName('task-input');
	var idRegex = /[a-z]+\-/g;
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
		var editTask = '<input id="inp-' + taskId + '" class="task-input task" value="' + edit.innerText + '" />';
		edit.innerHTML = editTask;
		var newInput = document.getElementById('inp-' + taskId);
		newInput.focus();

		if(toDoLoop.length > 1) {
			closeOutEdit(toDoLoop, taskId);
		}
	}

	// fn() to be called and close the Edit-input
	function closeOutEdit(loop, id) {
		for(var i = 0; i < loop.length; i++) {
			var tmpId = loop[i].id.replace(idRegex, '');
			var tmpVal = loop[i].value;
			if(tmpId !== id) {
				saveEdit(tmpId, tmpVal);
			}
		}
	}

	// Listening for "enter" key to be pressed.
	document.addEventListener("keyup", function(event) {
		var getClassList = event.target.classList;
		//Replace Alphanumerical Characters to get the index from the input - pattern would not affect addTodo.
		var getId = event.target.id.replace(idRegex, '');
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

	//Listend for a click on the Add Task Input and adjust editable inputs.
	todo.addEventListener('click', function() {
		if(toDoLoop.length >= 1) {
			closeOutEdit(toDoLoop, 'addTodo');
		}
	});

})(); // End IIFE
