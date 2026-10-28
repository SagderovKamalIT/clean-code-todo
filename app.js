const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const editTask = (event) => {
  const listItem = event.currentTarget.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = (event) => {
  const listItem = event.currentTarget.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTaskStatus = (event) => {
  const checkBox = event.currentTarget;
  const listItem = checkBox.parentNode;
  const isCompleted = checkBox.checked;

  const targetHolder = isCompleted ? completedTasksHolder : incompleteTaskHolder;
  targetHolder.appendChild(listItem);
};

const bindTaskEvents = (taskListItem, checkboxHandler) => {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkboxHandler);
};

const addTask = () => {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskStatus);

  taskInput.value = "";
};

addButton.addEventListener("click", addTask);

Array.from(incompleteTaskHolder.children).forEach((task) =>
  bindTaskEvents(task, toggleTaskStatus)
);

Array.from(completedTasksHolder.children).forEach((task) =>
  bindTaskEvents(task, toggleTaskStatus)
);
