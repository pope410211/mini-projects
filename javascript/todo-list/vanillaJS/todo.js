(function() {
	
	// Begin Array.
	var taskList = [];
	var tmpValueObj;

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

	function editTask(taskId) {
		var edit = document.getElementById(taskId);
		// Save variable to IIFE Scope, so that it can be used to save a value if a user 'clicks' off the input.
		tmpValueObj = {
			value: edit.innerText,
			ind: taskId
		};
		var editTask = '<input id="inp-' + taskId + '" class="task-input task" value="' + tmpValueObj.value + '" />';
		edit.innerHTML = editTask;
		var newInput = document.getElementById('inp-' + taskId);
		newInput.focus();
	} 

	function saveEdit(taskId, value) {
		var updateTask = document.getElementById(taskId);
		updateTask.innerHTML = value;
		var index = parseInt(taskId);
		taskList[index].task = value;

		console.log('taskList ', taskList);
	}

	// Listening for "enter" key to be pressed.
	document.addEventListener("keyup", function(event) {
		if(event.keyCode == 13) {
			var getClassList = event.target.classList;
			//Replace Alphanumerical Characters to get the index from the input - pattern would not affect addTodo.
			var getId = event.target.id.replace(/[a-z]+\-/g, '');
			var getValue = event.target.value;
			if(getId === 'addTodo') {

				// Create task Onject
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

	document.addEventListener('click', function(event) {
		var getClassList = event.target.classList;
		try {
			if(!getClassList.contains('task-input')) {
				if(typeof tmpValueObj === 'object') {
					saveEdit(tmpValueObj.ind, tmpValueObj.value);
				}
			} 
		} catch(e) {
			console.error('Error on Click: ', e);
		}

	});

})(); // End IIFE
