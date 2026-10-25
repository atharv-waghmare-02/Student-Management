```javascript
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const total = document.getElementById("total");
const search = document.getElementById("search");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents() {
    const searchText = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.roll.toLowerCase().includes(searchText) ||
        student.course.toLowerCase().includes(searchText)
    );

    studentList.innerHTML = "";

    filteredStudents.forEach(student => {
        const row = document.createElement("tr");

        [student.name, student.roll, student.course].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            students = students.filter(item => item.id !== student.id);
            saveStudents();
            displayStudents();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        studentList.appendChild(row);
    });

    total.textContent = students.length;
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const course = document.getElementById("course").value;

    if (!name || !roll || !course) {
        alert("Please fill in all fields.");
        return;
    }

    if (students.some(student =>
        student.roll.toLowerCase() === roll.toLowerCase()
    )) {
        alert("This roll number already exists!");
        return;
    }

    students.push({
        id: Date.now(),
        name,
        roll,
        course
    });

    saveStudents();
    studentForm.reset();
    displayStudents();
});

search.addEventListener("input", displayStudents);

displayStudents();
```