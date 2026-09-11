/* =========================================================
   todo.js — logic for the To-Do List project
   Tasks persist in the browser via localStorage.
   ========================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-todo-tasks";
  var form = document.getElementById("todoForm");
  var input = document.getElementById("todoInput");
  var list = document.getElementById("todoList");
  var emptyMsg = document.getElementById("todoEmpty");
  if (!form || !input || !list) return;

  function loadTasks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function render() {
    var tasks = loadTasks();
    list.innerHTML = "";
    if (emptyMsg) emptyMsg.style.display = tasks.length ? "none" : "block";

    tasks.forEach(function (task, index) {
      var li = document.createElement("li");
      li.className = "todo-item" + (task.done ? " done" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!task.done;
      checkbox.setAttribute("aria-label", "Mark task complete");
      checkbox.addEventListener("change", function () {
        var current = loadTasks();
        current[index].done = checkbox.checked;
        saveTasks(current);
        render();
      });

      var span = document.createElement("span");
      span.textContent = task.text;

      var del = document.createElement("button");
      del.type = "button";
      del.className = "todo-delete";
      del.setAttribute("aria-label", "Delete task");
      del.textContent = "✕";
      del.addEventListener("click", function () {
        var current = loadTasks();
        current.splice(index, 1);
        saveTasks(current);
        render();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    var tasks = loadTasks();
    tasks.push({ text: text, done: false });
    saveTasks(tasks);
    input.value = "";
    input.focus();
    render();
  });

  render();
})();
