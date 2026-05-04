const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterSubject = document.getElementById("filterSubject");
const sortBtn = document.getElementById("sortBtn");
const apiData = document.getElementById("apiData");
const darkModeBtn = document.getElementById("darkModeToggle");

let tasks = [];

// ADD TASK
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const subject = document.getElementById("subject").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!name || !subject || !dueDate) {
        alert("Please fill all fields");
        return;
    }

    const task = {
        id: Date.now(),
        name,
        subject,
        dueDate
    };

    tasks.push(task);
    displayTasks(tasks);
    form.reset();
});

// DISPLAY TASKS
const displayTasks = (taskArray) => {
    taskList.innerHTML = "";

    if (taskArray.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4" class="no-data">No tasks available</td></tr>`;
        return;
    }

    taskArray.forEach(({ id, name, subject, dueDate }) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${subject}</td>
            <td>${dueDate}</td>
            <td><button class="btn-secondary delete-btn">Delete</button></td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter(task => task.id !== id);
            displayTasks(tasks);
        });

        taskList.appendChild(row);
    });
};

// FILTER
filterSubject.addEventListener("change", () => {
    const value = filterSubject.value;

    const filtered = value === "all"
        ? tasks
        : tasks.filter(t => t.subject === value);

    displayTasks(filtered);
});

// SORT
sortBtn.addEventListener("click", () => {
    const sorted = [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    displayTasks(sorted);
});

// API FETCH
const fetchApiData = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await res.json();

        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.title;
            apiData.appendChild(li);
        });
    } catch (err) {
        apiData.innerHTML = "<li>Error loading data</li>";
    }
};

// DARK MODE
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    darkModeBtn.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

// INIT
fetchApiData();
