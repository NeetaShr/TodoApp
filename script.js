// DOM Elements
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const pendingTasks = document.querySelector("#pendingTasks");

const emptyState = document.querySelector("#emptyState");

let todos = [];

//loading todos from local storage pailai bhakolai store garne
 function loadTodos(){
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos){
        todos=JSON.parse(savedTodos);
    }
 }

 //New lai save garne
 function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
 } 



 //event listener add garne submit form ma
 form.addEventListener("submit", addTodo)

 function addTodo(e){
    e.preventDefault();
    
    const task= input.value.trim(); 
    if(task===""){
        alert("please enter the task");
        return;
    }
 

 //creating todo object
 const todo={
    id: Date.now(),
    text: task,
    completed: false
 };

 todos.push(todo);
//  console.log(todos);//temp
 //save to local storage
 saveTodos();
 input.value=" ";

 //render
 renderTodos();
}



function renderTodos() {
    //clear previous list
    todoList.innerHTML=" ";

    //show emptystate if no task
    if(todos.length===0){
        emptyState.classList.remove("hidden");
        return;
    }

    //hide
    emptyState.classList.add("hidden");

    //create a list item for each todo
    todos.forEach((todo)=>{
        const li= document.createElement("li");
        li.classList.add("todo-item");
        li.dataset.id= todo.id;

        li.innerHTML=`
        <label>
        <input type= "checkbox" class="checkbox" ${todo.completed?"checked":""}>
        <span>${todo.text}</span>
        </label>
             <div class="actions">

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>`;
            todoList.appendChild(li);
    });
    updateStats();
}


function updateStats(){
    totalTasks.textContent = todos.length;
    const completed= todos.filter(todo=>todo.completed).length;
    completedTasks.textContent= completed;
    pendingTasks.textContent= todos.length - completed;
}


todoList.addEventListener("click",handleTodoClick);

function handleTodoClick(e){
    //Delete
    if(e.target.classList.contains("delete-btn")){
        //id retrieve gareko
 const id = Number(e.target.closest("li").dataset.id);
        todos=todos.filter(todo=>todo.id!==id);
        saveTodos();
        renderTodos();
    }

    //Checkbox
    if(e.target.classList.contains("checkbox")){
        const id = Number(e.target.closest("li").dataset.id);

        const todo= todos.find(todo=>todo.id===id);
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }

    //edit
    if(e.target.classList.contains("edit-btn")){
        const id = Number(e.target.closest("li").dataset.id);
        const todo = todos.find(todo=>todo.id==id);
        //user snga prompt magne
        const updatedTask = prompt("Edit Task",todo.text);
        if(updatedTask===null) return;
        if(updatedTask.trim()===" ")return;
        todo.text=updatedTask.trim();

        saveTodos();
        renderTodos();
    }


}

loadTodos();
renderTodos();







