let todo_task = document.querySelector('[name="todo-title"]');
let addBtn = document.querySelector('.AddBTN');
let todoCol = document.querySelector('.items-col-todo');
let inprogressCol = document.querySelector('.items-col-inprogress');
let doneCol = document.querySelector('.items-col-done');
let Boxs = document.querySelectorAll('.Box');
let drag = null;

function getData() {
  const data = localStorage.getItem('todos');
  return JSON.parse(data) || [];
}

const todos = getData();

// const todos = [
//   // new Date().getTime(),
//   {
//     id: 1,
//     text: 'first todo',
//     completed: false,
//     type: 'todo',
//   },
//   {
//     id: 2,
//     text: 'second todo',
//     completed: false,
//     type: 'in-progress',
//   },
//   {
//     id: 3,
//     text: 'third todo',
//     completed: false,
//     type: 'done',
//   },
// ];

const addTodo = (text) => {
  todos.push({
    id: new Date().getTime(),
    text: text,
    completed: false,
    type: 'todo',
  });

  localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteTodo = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  render();
};

const renderTodoEl = (todo) => {
  return `<div class="dragItem border border-2" draggable="true" id='${todo.id}'> 
                            <div class="d-flex mb-3" >
                                <div class="p-2" >
                                    <span  > ${todo.text} </span>
                                </div>
                                
                                <div  class="ml-auto p-2"> <button id='${todo.id}' class="btn btn-danger DeleteTodo"> x </button> </div> 
                            </div>
                        </div>`;
};

addBtn.addEventListener('click', function () {
  if (todo_task.value != '') {
    addTodo(todo_task.value);
    render();
    todo_task.value = '';

    dragTasks();
  }
});

// fetch todo => read all todos
const render = () => {
  todoCol.innerHTML = '';
  inprogressCol.innerHTML = '';
  doneCol.innerHTML = '';
  todos.forEach((todo) => {
    switch (todo.type) {
      case 'todo':
        todoCol.innerHTML += renderTodoEl(todo);

        break;
      case 'inprogress':
        inprogressCol.innerHTML += renderTodoEl(todo);

        break;

      case 'done':
        doneCol.innerHTML += renderTodoEl(todo);

        break;

      default:
        break;
    }
  });

  document.querySelectorAll('.DeleteTodo').forEach((btn) => {
    btn.addEventListener('click', function () {
      deleteTodo(+btn.id);
    });
  });
};

render();

// drage and drop function
function dragTasks() {
  document.querySelectorAll('.dragItem').forEach((task, i) => {
    task.addEventListener('dragstart', function () {
      // console.log("start");
      drag = task;
    });
    task.addEventListener('dragend', function () {
      // console.log("end");
      drag = null;
    });
    Boxs.forEach((box) => {
      box.addEventListener('dragover', function (e) {
        e.preventDefault();
        if (this.dataset.columns == 'in progress') {
          this.style.backgroundColor = '#8957E5';
        } else if (this.dataset.columns == 'completed') {
          this.style.backgroundColor = '#238636';
        }
      });
      box.addEventListener('dragleave', function () {
        this.style.backgroundColor = '#010409';
        this.style.color = '#E6EDF3';
      });
      box.addEventListener('drop', function () {
        this.append(drag);

        changeType(+drag.id, drag.parentElement.id);

        // console.log(type);
        this.style.backgroundColor = '#010409';
        this.style.color = '#E6EDF3';
      });
    });
  });
}
dragTasks();

const changeType = (id, type) => {
  //   console.log(id, type);

  todos.map((todo) => {
    if (todo.id === id) {
      console.log(todo);
      todo.type = type;
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos));
};
