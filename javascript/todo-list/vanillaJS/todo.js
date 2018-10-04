(function() {
	
	// Begin Array.
	var taskList = [];	
	// Document Variables.
	var todo = document.getElementById('addTodo');
	var list = document.getElementById('list');
	var toDoLoop = document.getElementsByClassName('task-input');
	var idRegex = /[a-z]+\-/g;

	//fn() to create task Obj.
	function Task(task, completed) {
		this.task = task;
		this.completed = completed;
	}

	function createButton(id, type, val) {
		var btn = document.createElement('button');
		btn.innerHTML = val;
		btn.setAttribute('id', 'btn-' + type + '-' + id);
		btn.setAttribute('class', 'btn btn-' + type);

		return btn;
	}

	function createSpan(id, val) {
		var sp = document.createElement('span');
		var text = document.createTextNode(val.task);
		sp.appendChild(text);
		sp.setAttribute('id', 'span-' + id);
		sp.setAttribute('class', 'sp sp-item');

		return sp;
	}

	//fn() to add list item.
	function addLi(text, ind) {
		var li = document.createElement('li');
		var liText = createSpan(ind, text);
		var delBtn = createButton(ind, 'del', 'Delete');
		var comBtn = createButton(ind, 'comp', 'Done');
		li.appendChild(liText);
		li.appendChild(comBtn);
		li.appendChild(delBtn);
		li.setAttribute('id', ind);
		li.setAttribute('class', 'task-item');
		list.appendChild(li);
	}

	function saveEdit(taskId, value) {

		var updateTask = document.getElementById('span-' + taskId);
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

	function deleteTask(taskId) {
		var index = parseInt(taskId);
		var del = document.getElementById(taskId);
		del.parentNode.removeChild(del);
		taskList[index].completed = null;
		taskList[index].task = 'Removed';
	}

	function completeTask(taskId) {
		var complete = document.getElementById('span-' + taskId);
		var hideDel = document.getElementById('btn-del-' + taskId);
		var changeComp = document.getElementById('btn-comp-' + taskId);
		var index = parseInt(taskId);
		complete.classList.remove('sp-item');
		complete.classList.add('sp-item-completed');
		hideDel.classList.add('hide');
		changeComp.innerHTML = 'Undo';
		changeComp.classList.add('undo');
		taskList[index].completed = true;
	}

	function undoTask(taskId) {
		var complete = document.getElementById('span-' + taskId);
		var hideDel = document.getElementById('btn-del-' + taskId);
		var changeComp = document.getElementById('btn-comp-' + taskId);
		var index = parseInt(taskId);
		complete.classList.add('sp-item');
		complete.classList.remove('sp-item-completed');
		hideDel.classList.remove('hide');
		changeComp.innerHTML = 'Done';
		changeComp.classList.remove('undo');
		taskList[index].completed = false;
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
			if(getId === 'addTodo' && getValue !== '') {

				// Create task Object
				var newTask = new Task(getValue, false);
				// Push newTask into the array (at the end).
				taskList.push(newTask);
				// Clear Value for next Input.
				todo.value = '';
				var taskIndex = taskList.length - 1;
				addLi(newTask, taskIndex);
			} else if(getClassList.contains('task-input')) {
				saveEdit(getId, getValue);
			} else if(getId === 'addTodo') {
				alert('Input cannot be empty');
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

		if(getClassList.contains('sp-item')) {
			editTask(getId);
		}
	});

	list.addEventListener('click', function(event) {
		var getClass = event.target.classList;
		var getId = event.target.id.replace(idRegex, '');

		if (getClass.contains('btn-del')) {
			deleteTask(getId);
		} else if (getClass.contains('btn-comp')) {
			if (getClass.contains('undo')) {
				undoTask(getId);

			} else {
				completeTask(getId);

			}
		}

	});

	//Listend for a click on the Add Task Input and adjust editable inputs.
	todo.addEventListener('click', function() {
		if(toDoLoop.length >= 1) {
			closeOutEdit(toDoLoop, 'addTodo');
		}
	});
/*
	TODO: Loop over array and add/update li's based on what exists in the array.
*/
})(); // End IIFE
