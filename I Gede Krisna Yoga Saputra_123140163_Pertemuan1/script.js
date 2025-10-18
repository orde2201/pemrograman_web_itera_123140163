// DATA STORAGE
let tasks = [];
let editingId = null;
let currentFilter = 'semua';

// untuk mengaktifkan localStorage
tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    updateStats();
    setupEventListeners();
});


// EVENT LISTENERS SETUP
function setupEventListeners() {
    // Show form button
    document.getElementById('showFormBtn').addEventListener('click', showForm);
    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', hideForm);
    // Submit button
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    // Search input
    document.getElementById('searchInput').addEventListener('input', renderTasks);
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTasks();
        });
    });
}


// FORM FUNCTIONS
function showForm() {
    document.getElementById('formContainer').classList.add('show');
    document.getElementById('showFormBtn').style.display = 'none';
}

function hideForm() {
    document.getElementById('formContainer').classList.remove('show');
    document.getElementById('showFormBtn').style.display = 'block';
    resetForm();
}

function resetForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskCourse').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('formTitle').textContent = 'Tambah Tugas';
    document.getElementById('submitBtn').textContent = 'Simpan';
    editingId = null;
    clearErrors();
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(msg => {
        msg.classList.remove('show');
    });
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('error');
    });
}


// VALIDATION
function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('taskName').value.trim();
    const course = document.getElementById('taskCourse').value.trim();
    const deadline = document.getElementById('taskDeadline').value;

    // Validate name
    if (!name) {
        document.getElementById('taskName').classList.add('error');
        document.getElementById('errorName').classList.add('show');
        isValid = false;
    }
    // Validate course
    if (!course) {
        document.getElementById('taskCourse').classList.add('error');
        document.getElementById('errorCourse').classList.add('show');
        isValid = false;
    }
    // Validate deadline
    if (!deadline) {
        document.getElementById('taskDeadline').classList.add('error');
        document.getElementById('errorDeadline').classList.add('show');
        isValid = false;
    } else {
        const selectedDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            document.getElementById('taskDeadline').classList.add('error');
            document.getElementById('errorDeadline').classList.add('show');
            document.getElementById('errorDeadline').textContent = 'Deadline tidak boleh tanggal yang sudah lewat';
            isValid = false;
        }
    }
    return isValid;
}


// CRUD OPERATIONS
function handleSubmit() {
    if (!validateForm()) return;

    const taskData = {
        nama: document.getElementById('taskName').value.trim(),
        mataKuliah: document.getElementById('taskCourse').value.trim(),
        deadline: document.getElementById('taskDeadline').value,
        selesai: false
    };

    if (editingId) {
        // Update existing task
        const index = tasks.findIndex(t => t.id === editingId);
        tasks[index] = { ...tasks[index], ...taskData };
    } else {
        // Add new task
        taskData.id = Date.now();
        taskData.tanggalDibuat = new Date().toISOString();
        tasks.push(taskData);
    }

    //menyimpan ke localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    hideForm();
    renderTasks();
    updateStats();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('taskName').value = task.nama;
    document.getElementById('taskCourse').value = task.mataKuliah;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('formTitle').textContent = 'Edit Tugas';
    document.getElementById('submitBtn').textContent = 'Update';
    editingId = id;
    showForm();
}

function deleteTask(id) {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;

    tasks = tasks.filter(t => t.id !== id);
    
    // untuk menyimpan ke localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTasks();
    updateStats();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.selesai = !task.selesai;
        
         //untuk menyimpan ke localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks();
        updateStats();
    }
}


// RENDER FUNCTIONS
function renderTasks() {
    const container = document.getElementById('tasksContainer');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    // Filter tasks
    let filteredTasks = tasks.filter(task => {
        // Filter by status
        const matchesFilter = 
            currentFilter === 'semua' ? true :
            currentFilter === 'selesai' ? task.selesai :
            currentFilter === 'belum' ? !task.selesai : true;

        // Filter by search
        const matchesSearch = 
            task.nama.toLowerCase().includes(searchQuery) ||
            task.mataKuliah.toLowerCase().includes(searchQuery);

        return matchesFilter && matchesSearch;
    });

    // Empty state
    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>${tasks.length === 0 ? 
                    'Belum ada tugas' : 
                    'Tidak ada tugas yang sesuai'
                }</p>
            </div>
        `;
        return;
    }

    // Render tasks
    container.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.selesai ? 'completed' : ''}">
            <div class="task-checkbox ${task.selesai ? 'checked' : ''}" 
                 onclick="toggleComplete(${task.id})">
            </div>
            <div class="task-content">
                <div class="task-title ${task.selesai ? 'completed' : ''}">
                    ${task.nama}
                </div>
                <div class="task-meta">
                    <span class="task-badge">${task.mataKuliah}</span>
                    <span class="task-badge ${isDeadlineNear(task.deadline) && !task.selesai ? 'urgent' : ''}">
                        ${formatDate(task.deadline)}
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn edit" onclick="editTask(${task.id})">✏️</button>
                <button class="action-btn delete" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.selesai).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}


// UTILITY FUNCTIONS
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function isDeadlineNear(deadline) {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
}
