/* ============================================
   TASK MANAGER LOGIC (script.js)
   ============================================ */

// Storage key for tasks
const TASKS_STORAGE_KEY = 'taskManagerTasks';
const LOGIN_STORAGE_KEY = 'taskManagerLogin';

// Task Manager State
let tasks = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize task manager
    initializeTaskManager();
});

/**
 * Initialize the task manager
 */
function initializeTaskManager() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const logoutBtn = document.getElementById('logoutBtn');

    // Load tasks from localStorage
    loadTasks();

    // Render initial task list
    renderTasks();

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            logoutUser();
        }
    });

    // Focus input on page load
    taskInput.focus();
}

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
function isLoggedIn() {
    const loginData = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (!loginData) return false;

    try {
        const data = JSON.parse(loginData);
        return data && data.isLoggedIn === true;
    } catch (e) {
        return false;
    }
}

/**
 * Logout user and redirect to login page
 */
function logoutUser() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    window.location.href = 'login.html';
}

/**
 * Add a new task
 */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const inputError = document.getElementById('inputError');

    // Validate input
    if (taskText === '') {
        inputError.textContent = 'Please enter a task';
        inputError.classList.add('show');
        return;
    }

    // Clear error message
    inputError.classList.remove('show');

    // Create task object with unique ID and timestamp
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add task to array
    tasks.push(task);

    // Save to localStorage
    saveTasks();

    // Clear input
    taskInput.value = '';
    taskInput.focus();

    // Render updated task list
    renderTasks();
}

/**
 * Toggle task completion status
 * @param {number} taskId - Task ID
 */
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Delete a task with animation
 * @param {number} taskId - Task ID
 */
function deleteTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

    if (taskElement) {
        // Add deleting animation class
        taskElement.classList.add('deleting');

        // Wait for animation to complete before removing
        setTimeout(() => {
            // Remove task from array
            tasks = tasks.filter(t => t.id !== taskId);

            // Save to localStorage
            saveTasks();

            // Render updated task list
            renderTasks();
        }, 300);
    }
}

/**
 * Render all tasks
 */
function renderTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    const taskCount = document.getElementById('taskCount');

    // Clear container
    tasksContainer.innerHTML = '';

    // Show empty state if no tasks
    if (tasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <p class="empty-icon">📝</p>
                <p class="empty-text">No tasks yet</p>
                <p class="empty-subtitle">Add a task to get started</p>
            </div>
        `;
        taskCount.textContent = '0 tasks';
        return;
    }

    // Render each task
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });

    // Update task count
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    taskCount.textContent = `${totalCount} ${totalCount === 1 ? 'task' : 'tasks'} (${completedCount} completed)`;
}

/**
 * Create a task element
 * @param {Object} task - Task object
 * @returns {HTMLElement} Task element
 */
function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.setAttribute('data-task-id', task.id);

    taskItem.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
        >
        <div class="task-content">
            <p class="task-text">${escapeHtml(task.text)}</p>
            <p class="task-time">${task.createdAt}</p>
        </div>
        <button class="delete-btn" title="Delete task">
            🗑️
        </button>
    `;

    // Add event listeners
    const checkbox = taskItem.querySelector('.task-checkbox');
    const deleteBtn = taskItem.querySelector('.delete-btn');

    checkbox.addEventListener('change', function() {
        toggleTaskCompletion(task.id);
    });

    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });

    return taskItem;
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    try {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } catch (e) {
        console.error('Error loading tasks:', e);
        tasks = [];
    }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
