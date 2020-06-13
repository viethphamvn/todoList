//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-dropdown");

//Event Handlers

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", handleClick);
filterTodo.addEventListener("change", filterOption);
document.addEventListener("DOMContentLoaded", getToDo);

//Functions

function addToDo(event) {
    //Prevent page reloading
    event.preventDefault();

    //Create TODO Div
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    //Create li
    const li = document.createElement("li");
    li.innerText = todoInput.value;
    li.classList.add("todo-item")

    //Create Buttons
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    

    //Append Child
    todoItem.appendChild(li);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);

    //Add todo item to local storage
    saveToStorage([todoInput.value, true]);

    //Clear input value
    todoInput.value = "";
}

function handleClick(event){
    if (event.target.classList.contains("complete-button")){
        console.log("Checked");
        //Handle check
        markDone(event);
    } else if (event.target.classList.contains("delete-button")) {
        //Handle delete
        console.log("Deleted");
        deleteItem(event);
    }
}

function markDone(event){
    const parent = event.target.parentElement;
    parent.classList.toggle("completed");

    //Modify Localstorage
    let todos = JSON.parse(localStorage.getItem('todos'));
    let tempTodos = todos;

    let index = -1;
    tempTodos.forEach(e => {
        index++;
        if (e[0] === parent.childNodes[0].innerText){
            if (e[1] === true){
                todos.splice(index,1);
                todos.splice(index,0,[e[0],false]);
            } else {
                todos.splice(index,1);
                todos.splice(index,0,[e[0],true]);
            }
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));

}

function deleteItem(event){
    const parent = event.target.parentElement;
    //Add animation
    parent.classList.add("falldown");
    //Add transition listener
    parent.addEventListener('transitionend', function(){
        //Modify Localstorage
        let todos = JSON.parse(localStorage.getItem('todos'));
        let tempTodos = todos;

        let index = -1;
        tempTodos.forEach(e => {
            index++;
            if (e[0] === parent.childNodes[0].innerText){
                todos.splice(index,1);
            }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        
        parent.remove();
    });
}

function filterOption(event){
    const childList = todoList.childNodes;

    console.log(childList);

    switch (event.target.value) {
        case 'all':
            childList.forEach(e => {
                if (e.style !== undefined){
                    e.style.display = 'flex';
                }
            });
            break;
        case 'completed':
            childList.forEach(e => {
                if (e.style !== undefined){
                    if (e.classList.contains('completed')){
                        e.style.display = 'flex';
                    } else {
                        e.style.display = 'none';
                    }
                }
            });
            break;
        default:
            childList.forEach(function(e){
                if (e.style !== undefined){
                    if (!e.classList.contains('completed')){
                        e.style.display = 'flex';
                    } else {
                        e.style.display = 'none';
                    }
                }
            });
            break;
    }
}

function saveToStorage(data){
    let todos;
    if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === []){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(data);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDo(){
    let todos;
    if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === []){
        return;
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(e => {
            //Create TODO Div
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo");
            //Create li
            const li = document.createElement("li");
            li.innerText = e[0];
            li.classList.add("todo-item")

            //Create Buttons
            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button");
            completeButton.innerHTML = '<i class="fas fa-check"></i>';

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            

            //Append Child
            todoItem.appendChild(li);
            todoItem.appendChild(completeButton);
            todoItem.appendChild(deleteButton);

            if (e[1] === false){
                todoItem.classList.add('completed');
            }

            todoList.appendChild(todoItem);
        });
    }
}