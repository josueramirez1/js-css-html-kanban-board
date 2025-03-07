// variables
const todoContainers = document.querySelectorAll(".todo-container");
const columnContainers = document.querySelectorAll(".column-container");
let titleText = document.getElementById("title-text");
let descriptionText = document.getElementById("description-text");
const submitBtn = document.getElementById("submit-btn");
let todo;

let tasks = [
  {
    id: 0,
    title: "Fix submit button",
    description:
      "The submit button has stopped working since the last release.",
  },
  {
    id: 1,
    title: "Change text on T and C's",
    description:
      "The terms and conditions need updating as per the business meeting.",
  },
  {
    id: 2,
    title: "Change banner picture",
    description:
      "Marketing has requested a new banner to be added to the website.",
  },
];

// event listeners

addDefault();

submitBtn.addEventListener("click", addToTaskList);

todoContainers.forEach((todoContainer) => {
  todoContainer.children[0].children[1].addEventListener("click", deleteBtn);
  todoContainer.addEventListener("dragstart", dragStart);
});

columnContainers.forEach((columnContainer) => {
  columnContainer.addEventListener("dragover", dragOver);
  columnContainer.addEventListener("drop", dropOver);
});

// functions

function deleteBtn(e) {
  const itemToDelete = parseInt(this.parentNode.parentNode.id);
  tasks = tasks.filter((task) => {
    return task.id !== itemToDelete;
  });

  this.parentNode.parentNode.remove();

  let newIdNum = 0;
  let newtodoId = 0;
  tasks.forEach((task) => (task.id = newIdNum++));
  let todoList = document.querySelectorAll(".todo-container");
  todoList.forEach((todoContainer) => {
    todoContainer.id = newtodoId++;
  });
}

function dragStart(e) {
  if (e.target.className === "todo-container") todo = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dropOver(e) {
  e.preventDefault();
  addColor(e);
}

function addColor(e) {
  if (e.target.className === "column-container" && e.target.id === "column-1") {
    e.target.append(todo);
    todo.children[0].style.backgroundColor = "#9dc4e7";
  }
  if (e.target.className === "column-container" && e.target.id === "column-2") {
    e.target.append(todo);
    todo.children[0].style.backgroundColor = "#9EA1D4";
  }
  if (e.target.className === "column-container" && e.target.id === "column-3") {
    e.target.append(todo);
    todo.children[0].style.backgroundColor = "#A8D1D1";
  }
  if (e.target.className === "column-container" && e.target.id === "column-4") {
    e.target.append(todo);
    todo.children[0].style.backgroundColor = "#FD8A8A";
  }
}

function addTodo(id, title, description) {
  const todoDiv = document.createElement("div");
  const todoTitleDiv = document.createElement("div");
  const h4TitleElement = document.createElement("h4");
  const h4Logo = document.createElement("h4");
  const todoDescription = document.createElement("div");
  const paragraphDescription = document.createElement("p");

  todoDiv.classList.add("todo-container");
  todoDiv.id = id;
  todoTitleDiv.classList.add("todo-title");
  h4Logo.classList.add("delete-todo");
  todoDescription.classList.add("todo-description");
  // todo container
  h4TitleElement.textContent = title;
  h4Logo.textContent = "☒";
  paragraphDescription.textContent = description;

  todoDiv.draggable = "true";

  columnContainers[0].append(todoDiv);
  todoDiv.append(todoTitleDiv);
  todoTitleDiv.append(h4TitleElement, h4Logo);
  todoDiv.append(todoDescription);
  todoDescription.append(paragraphDescription);

  // add dragEvent
  todoDiv.addEventListener("dragstart", dragStart);
  titleText.value = "";
  descriptionText.value = "";

  // add delete listener
  todoDiv.children[0].children[1].addEventListener("click", deleteBtn);
}

function addDefault() {
  tasks.forEach((task) => addTodo(task.id, task.title, task.description));
}

function addToTaskList(e) {
  e.preventDefault();
  console.log(tasks.length);
  let newTask = {
    id: tasks.length,
    title: titleText.value,
    description: descriptionText.value,
  };
  tasks.push(newTask);
  addTodo(newTask.id, newTask.title, newTask.description);
}
