const inputContainer = document.querySelector(".input-box");
const taskBox = document.querySelector(".task-box");

const filters =  document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clearBtn');

// getting local storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));




filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});



function showTodo(filters) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(filters == todo.status || filters == "all") {
            li += `<li class="task">
                        <label for="${id}">
                            
                            <label class="checkbox-container">
                                <input type="checkbox" class="checkbox-input" onclick="updateStatus(this)" id="${id}" ${isCompleted}>
                                <span class="checkbox">
                                    <span class="fa-solid fa-check"></span>
                                </span>
                            </label>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
    
                        <div class="delete-btn">
                            <img src="images/icon-cross.svg" alt="" onclick="deteleTask(${id})">
                        </div>
                    </li>`;
        }
    });
  }

  taskBox.innerHTML = li || `<span class="no-task">You don't have any task here</span>`;
};
showTodo("all");

                        
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;

    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "active";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function deteleTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})


inputContainer.addEventListener("keyup", (e) => {
  let userTask = inputContainer.value.trim();

  if (e.key == "Enter" && userTask) {  // copy this line of code into  isEditedTask control statement line no 78
    if (!todos) {
      todos = [];
    }

    inputContainer.value = "";
    let taskInfo = { name: userTask, status: "active" };
    todos.push(taskInfo);

    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }
});


/*

// global
let editId;
let isEditedTask = false;

function editTask(taskId, taskName) { 
    editId = taskId;
    isEditedTask = true;
    inputContainer.value = taskName;
}

if (isEditedTask) {  


}else {
    isEditedTask = true;
    todo[editId].name = userTask;
}


                        <label for="${id}">
                            <input type="checkbox" onclick="updateStatus(this)" id="${id}" class="checkbox" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>

                        <label class="checkbox-container">
                                <input type="checkbox" class="checkbox-input" onclick="updateStatus(this)" id="${id}" ${isCompleted}>
                                <span class="checkbox">
                                    <span class="fa-solid fa-check"></span>
                                </span>
                        </label>

*/





// dark theme

var darkIcon = document.getElementById("icon");

darkIcon.onclick = function() {
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")) {
        darkIcon.src = "images/icon-sun.svg";
    }else {
        darkIcon.src = "images/icon-moon.svg";
    }
}