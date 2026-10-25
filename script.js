const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

// Ambil data tersimpan dari browser (localStorage)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodo(index));

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.addEventListener("click", () => toggleTodo(index));

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Hapus tugas");
    del.addEventListener("click", () => deleteTodo(index));

    li.append(checkbox, text, del);
    list.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.done).length;
  counter.textContent =
    todos.length === 0
      ? "Belum ada tugas. Yuk tambah satu!"
      : `${remaining} tugas belum selesai dari ${todos.length}`;
}

function addTodo(text) {
  todos.push({ text, done: false });
  save();
  render();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  save();
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  save();
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  addTodo(text);
  input.value = "";
  input.focus();
});

render();
