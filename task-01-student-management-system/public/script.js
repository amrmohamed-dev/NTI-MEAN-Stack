const showToast = (message, firstColor, secondColor) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
  }).showToast();
};

showToast('Welcome', '#00b09b', '#96c93d');

const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');

let students = [];
let updateIndex = null;

searchInput.addEventListener('keyup', displayStudents);

addBtn?.addEventListener('click', () => {
  let studentName = document.getElementById('studentName').value.trim();
  let studentMark = document.getElementById('studentMark').value.trim();

  if (studentName === '' || studentMark === '')
    return showToast('Enter student name and his mark', '#ff5f6d', '#ffc371');

  if (isNaN(studentMark) || +studentMark > 100 || +studentMark < 0)
    return showToast('Enter student mark in (0-100)', '#ff5f6d', '#ffc371');

  if (isDuplicate(studentName))
    return showToast('Student already exists', '#ff5f6d', '#ffc371');

  studentMark = +studentMark;

  const studentGpa = calcGrade(studentMark);
  const student = { name: studentName, mark: studentMark, gpa: studentGpa };

  students.unshift(student);

  clearInputs();
  displayStudents();

  showToast('Student added successfully', '#00b09b', '#96c93d');
});

updateBtn?.addEventListener('click', () => {
  let studentName = document.getElementById('studentName').value.trim();
  let studentMark = document.getElementById('studentMark').value.trim();

  if (studentName === '' || studentMark === '')
    return showToast('Enter student name and his mark', '#ff5f6d', '#ffc371');

  if (+studentMark > 100)
    return showToast('Enter student mark in (0-100)', '#ff5f6d', '#ffc371');

  studentMark = +studentMark;

  const studentGpa = calcGrade(studentMark);
  const student = { name: studentName, mark: studentMark, gpa: studentGpa };

  students[updateIndex] = student;
  updateBtn.classList.add('d-none');
  addBtn.classList.remove('d-none');
  clearInputs();
  displayStudents();
  showToast('Student updated successfully', '#00b09b', '#96c93d');
});

function isDuplicate(studentName) {
  return students.some((s) => s.name === studentName);
}

function calcGrade(mark) {
  let grade = 'Fail';

  if (mark >= 85) grade = 'Excellent';
  else if (mark >= 75) grade = 'Very Good';
  else if (mark >= 65) grade = 'Good';
  else if (mark >= 50) grade = 'Pass';

  return grade;
}

function clearInputs() {
  document.getElementById('studentName').value = '';
  document.getElementById('studentMark').value = '';
}

function editStudent(studentId) {
  document.getElementById('studentName').value = students[studentId].name;
  document.getElementById('studentMark').value = students[studentId].mark;

  updateIndex = studentId;
  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');
}

function deleteStudent(studentId) {
  students.splice(studentId, 1);
  displayStudents();
  showToast('Student deleted successfully', '#00b09b', '#96c93d');
}

function displayStudents() {
  let search = searchInput.value.toLowerCase();
  let rows = '';
  students.forEach((studnet, i) => {
    if (studnet.name.toLowerCase().includes(search)) {
      rows += `<tr>
        <td>${i + 1}</td>
        <td>${studnet.name}</td>
        <td>${studnet.mark}</td>
        <td>${studnet.gpa}</td>
        <td>
          <button onclick="editStudent(${i})" class="btn btn-outline-primary">Edit</button>
          <button onclick="deleteStudent(${i})" class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>
      `;
    }
  });

  updateStatistics();

  tableBody.innerHTML = rows;
}

function updateStatistics() {
  let avgMark = document.getElementById('avgMark');
  let topStudent = document.getElementById('topStudent');
  let lowStudent = document.getElementById('lowStudent');
  if (students.length === 0) {
    avgMark.innerText = 0;
    topStudent.innerText = '-';
    lowStudent.innerText = '-';
    return;
  }

  let totalMarks = 0;
  let top = students[0];
  let low = students[0];

  students.forEach((student) => {
    totalMarks += student.mark;

    if (student.mark > top.mark) top = student;
    if (student.mark < low.mark) low = student;
  });

  let average = (totalMarks / students.length).toFixed(1);

  avgMark.innerText = average;
  topStudent.innerText = `${top.name} (${top.mark})`;
  lowStudent.innerText = `${low.name} (${low.mark})`;
}
