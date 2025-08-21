const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

// Navigation
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.dataset.section;
        showSection(targetSection);
        
        // Update active nav button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

function showSection(sectionName) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');
    
    // Load data for the section
    switch(sectionName) {
        case 'students':
            loadStudents();
            break;
        case 'teachers':
            loadTeachers();
            break;
        case 'courses':
            loadCourses();
            break;
    }
}

// Modal functions
function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModalFunc() {
    modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// API Functions
async function apiRequest(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data) {
        config.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        alert('An error occurred while communicating with the server.');
    }
}

// Students Management
async function loadStudents() {
    const students = await apiRequest('/students');
    const tbody = document.getElementById('students-tbody');
    
    tbody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.phone || 'N/A'}</td>
            <td>${new Date(student.dateOfBirth).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-warning" onclick="editStudent(${student.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showAddStudentForm() {
    const form = `
        <h3>Add New Student</h3>
        <form id="student-form">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone">
            </div>
            <div class="form-group">
                <label for="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" required>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Student</button>
        </form>
    `;
    
    openModal(form);
    
    document.getElementById('student-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const studentData = Object.fromEntries(formData);
        
        await apiRequest('/students', 'POST', studentData);
        closeModalFunc();
        loadStudents();
    });
}

async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        await apiRequest(`/students/${id}`, 'DELETE');
        loadStudents();
    }
}

// Event Listeners
document.getElementById('add-student-btn').addEventListener('click', showAddStudentForm);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});