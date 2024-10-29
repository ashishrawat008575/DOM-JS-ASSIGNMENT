document.getElementById('registration-form').addEventListener('submit', addStudent);

function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value;
    const id = document.getElementById('student-id').value;
    const className = document.getElementById('class').value;
    const rollNo = document.getElementById('roll-no').value;

    if (!name || !id || !className || !rollNo) {
        alert("Please fill in all fields.");
        return; // Prevent empty submission
    }

    const studentList = JSON.parse(localStorage.getItem('students')) || [];

    // Check for duplicate entries
    const isDuplicate = studentList.some(student => 
        student.name === name && 
        student.id === id && 
        student.class === className && 
        student.rollNo === rollNo
    );

    if (isDuplicate) {
        alert("This student is already registered with the same details.");
        return; // Prevent duplicate submission
    }

    // Add the new student record
    studentList.push({ name, id, class: className, rollNo });
    localStorage.setItem('students', JSON.stringify(studentList));
    
    document.getElementById('registration-form').reset();
    displayStudents();
}

function displayStudents() {
    const studentList = JSON.parse(localStorage.getItem('students')) || [];
    const listContainer = document.getElementById('student-list');
    listContainer.innerHTML = '';

    studentList.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.class}</td>
            <td>${student.rollNo}</td>
            <td>
                <button class="action-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        listContainer.appendChild(tr);
    });
}

function editStudent(index) {
    const studentList = JSON.parse(localStorage.getItem('students'));
    const student = studentList[index];

    document.getElementById('student-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('class').value = student.class;
    document.getElementById('roll-no').value = student.rollNo;

    studentList.splice(index, 1); // Remove student to avoid duplication on re-add
    localStorage.setItem('students', JSON.stringify(studentList));
    displayStudents();
}

function deleteStudent(index) {
    const studentList = JSON.parse(localStorage.getItem('students'));
    studentList.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(studentList));
    displayStudents();
}

// Load students on page load
document.addEventListener('DOMContentLoaded', displayStudents);
