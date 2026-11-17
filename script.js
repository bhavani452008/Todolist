
// =====================================
// FOCUSFLOW - SMART TODO APPLICATION
// =====================================

// Get HTML elements

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const overdueCount = document.getElementById("overdueCount");

const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

const submitBtn = document.getElementById("submitBtn");
const cancelEdit = document.getElementById("cancelEdit");
const formHeading = document.getElementById("formHeading");

const themeBtn = document.getElementById("themeBtn");

// Application data

let tasks = [];

try {
    tasks = JSON.parse(
        localStorage.getItem("focusflow_tasks")
    ) || [];
} catch (error) {
    tasks = [];
}

let currentFilter = "all";
let editingId = null;


// Generate unique ID

function generateId() {
    return Date.now().toString() +
        Math.random().toString(36).slice(2);
}


// Today's date

const today = new Date();

document.getElementById("todayDate").textContent =
    today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


// Save tasks in Local Storage

function saveTasks() {
    localStorage.setItem(
        "focusflow_tasks",
        JSON.stringify(tasks)
    );
}


// Check overdue tasks

function isOverdue(task) {
    return task.dueDate &&
        task.dueDate < getToday() &&
        !task.completed;
}

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// Escape text to prevent HTML injection

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// Add or Update Task

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        alert("Please enter a task!");
        return;
    }

    if (editingId !== null) {

        const task = tasks.find(t => t.id === editingId);

        if (task) {
            task.title = title;
            task.category = category.value;
            task.priority = priority.value;
            task.dueDate = dueDate.value;
        }

        editingId = null;

    } else {

        const newTask = {
            id: generateId(),
            title: title,
            category: category.value,
            priority: priority.value,
            dueDate: dueDate.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);
    }

    saveTasks();

    taskForm.reset();

    resetForm();

    renderTasks();

});


// Reset form

function resetForm() {

    editingId = null;

    formHeading.textContent = "✦ Create New Task";

    submitBtn.textContent = "+ Add Task";

    cancelEdit.hidden = true;
}


// Cancel editing

cancelEdit.addEventListener("click", function() {

    taskForm.reset();

    resetForm();

});


// Edit Task

function editTask(id) {

    const task = tasks.find(t => t.id === id);

    if (!task) return;

    editingId = id;

    taskInput.value = task.title;
    category.value = task.category;
    priority.value = task.priority;
    dueDate.value = task.dueDate;

    formHeading.textContent = "✎ Edit Your Task";

    submitBtn.textContent = "Update Task";

    cancelEdit.hidden = false;

    taskInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Delete Task

function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(t => t.id !== id);

    if (editingId === id) {
        taskForm.reset();
        resetForm();
    }

    saveTasks();

    renderTasks();

}


// Complete / Undo Task

function toggleTask(id) {

    const task = tasks.find(t => t.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks();

    renderTasks();

}


// Filter Tasks

function setFilter(filter) {

    currentFilter = filter;

    document.querySelectorAll("[data-filter]").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.classList.contains("nav-btn") &&
            btn.dataset.filter === filter
        );

        btn.classList.toggle(
            "selected",
            btn.classList.contains("filter-btn") &&
            btn.dataset.filter === filter
        );

    });

    renderTasks();

}


// Navigation filters

document.querySelectorAll(".nav-btn").forEach(btn => {

    btn.addEventListener("click", function() {

        setFilter(this.dataset.filter);

    });

});


// Task section filters

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", function() {

        setFilter(this.dataset.filter);

    });

});


// Search tasks

searchInput.addEventListener("input", renderTasks);


// Display tasks

function renderTasks() {

    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase().trim();

    let filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(searchText) ||
            task.category.toLowerCase().includes(searchText) ||
            task.priority.toLowerCase().includes(searchText);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;

    });

    // Sort: High priority first, then medium, then low

    const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1
    };

    filteredTasks.sort((a, b) => {
        return priorityOrder[b.priority] -
               priorityOrder[a.priority];
    });


    // Empty state

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">
                <span>✦</span>
                <h3>No tasks found!</h3>
                <p>Add a new task or change your search.</p>
            </div>
        `;

    }


    // Create task cards

    filteredTasks.forEach(task => {

        const card = document.createElement("div");

        card.className = "task-card";

        const dueText = task.dueDate
            ? new Date(task.dueDate + "T00:00:00")
                .toLocaleDateString()
            : "No due date";

        const overdueClass = isOverdue(task)
            ? "overdue"
            : "";

        const overdueText = isOverdue(task)
            ? " • OVERDUE"
            : "";

        const safeTitle = escapeHTML(task.title);
        const safeCategory = escapeHTML(task.category);
        const safePriority = escapeHTML(task.priority);

        card.innerHTML = `

            <input
                type="checkbox"
                class="complete-check"
                ${task.completed ? "checked" : ""}
                aria-label="Complete task"
            >

            <div class="task-details ${task.completed ? "completed" : ""}">

                <h3>${safeTitle}</h3>

                <div class="task-meta">

                    <span class="tag">
                        ${safeCategory}
                    </span>

                    <span class="tag priority-${task.priority.toLowerCase()}">
                        ${safePriority} Priority
                    </span>

                </div>

                <p class="${overdueClass}">
                    📅 ${dueText}${overdueText}
                </p>

            </div>

            <div class="task-actions">

                <button class="action-btn edit-btn"
                    title="Edit task">
                    ✎
                </button>

                <button class="action-btn delete-btn"
                    title="Delete task">
                    🗑
                </button>

            </div>

        `;

        // Event listeners for each task

        card.querySelector(".complete-check")
            .addEventListener("change", () => toggleTask(task.id));

        card.querySelector(".edit-btn")
            .addEventListener("click", () => editTask(task.id));

        card.querySelector(".delete-btn")
            .addEventListener("click", () => deleteTask(task.id));

        taskList.appendChild(card);

    });


    updateStatistics();

}


// Update dashboard statistics

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(t => t.completed).length;

    const pending = total - completed;

    const overdue = tasks.filter(t => isOverdue(t)).length;

    totalCount.textContent = total;

    completedCount.textContent = completed;

    pendingCount.textContent = pending;

    overdueCount.textContent = overdue;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressPercent.textContent = percentage + "%";

    progressBar.style.width = percentage + "%";

}


// Clear completed tasks

document.getElementById("clearCompleted")
    .addEventListener("click", function() {

        const completedTasks = tasks.filter(t => t.completed);

        if (completedTasks.length === 0) {
            alert("No completed tasks to clear!");
            return;
        }

        const confirmClear = confirm(
            "Delete all completed tasks?"
        );

        if (!confirmClear) return;

        tasks = tasks.filter(t => !t.completed);

        if (editingId !== null &&
            !tasks.some(t => t.id === editingId)) {
            taskForm.reset();
            resetForm();
        }

        saveTasks();

        renderTasks();

    });


// Dark / Light Mode

const savedTheme = localStorage.getItem("focusflow_theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeButton();


themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("focusflow_theme", theme);

    updateThemeButton();

});


function updateThemeButton() {

    const darkMode = document.body.classList.contains("dark");

    themeBtn.textContent = darkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

}


// Initial application render

renderTasks();

setFilter("all");
