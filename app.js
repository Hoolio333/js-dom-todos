const todosList = document.querySelector("#todo-list");
const newTodoForm = document.querySelector("#todo-item-form");

newTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // event represents the submit event & all the information about it
  // the events target is element what caused the event(submit), which is the form
  // target[0] is the first input field of the form, which is the text input
  // value is what is stored inside the input element (what the user has typed)
  const title = event.target[0].value;
  console.log(title);
  event.target.reset();

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, completed: false }),
  };

  fetch(`http://localhost:3000/todos`, opts)
    .then((res) => res.json())
    .then((todo) => {
      console.log(todo);
      updateTodoList();
    });
});

function updateTodoList() {
  todosList.innerHTML = "";
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((todo) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const deleteBtn = document.createElement("deleteBtn");
        button.innerText = "Done";
        deleteBtn.innerText = "X";
        li.innerText = todo.title;
        if (todo.completed) {
          li.className = "completed";
        }
        li.append(button, deleteBtn);
        todosList.appendChild(li);
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const opts = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true }),
          };
          fetch(`http://localhost:3000/todos/${todo.id}`, opts)
            .then((res) => res.json())
            .then((todo) => {
              console.log(todo);
              updateTodoList();
            });
        });
        deleteBtn.addEventListener("click", (event) => {
          event.preventDefault();
          const opts = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          };
          fetch(`http://localhost:3000/todos/${todo.id}`, opts)
            .then((res) => res.json())
            .then((todo) => {});
          updateTodoList();
        });
      });
    });
}

updateTodoList();
