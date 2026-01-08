const students = [
  {
    name: 'Amr Mohammed',
    attendance: 98,
    mid: 30,
    final: 48,
    tasks: 17,
    bonus: 5,
  },
  {
    name: 'Ali Sameh',
    attendance: 90,
    mid: '30ds',
    final: 40,
    tasks: 15,
    bonus: 0,
  },
  {
    name: 'Ahmed Marwan',
    attendance: 90,
    mid: 30,
    final: null,
    tasks: 15,
    bonus: 0,
  },
  {
    name: 'Mahmoud Abdullah',
    attendance: 90,
    mid: 30,
    final: 40,
    tasks: 15,
    bonus: 2,
  },
  {
    name: 'Mohammed Mustafa',
    attendance: 60,
    mid: 22,
    final: -250,
    tasks: 12,
    bonus: 0,
  },
  {
    name: 'Saleh Ahmed',
    attendance: 75,
    mid: 22,
    final: 25,
    tasks: 12,
    bonus: 0,
  },
  {
    name: 'Omar Ahmed',
    attendance: 80,
    mid: 25,
    final: 37,
    tasks: 12,
    bonus: 3,
  },
];

function validateGrades(student) {
  const { attendance, mid, final, tasks, bonus } = student;
  const values = [attendance, mid, final, tasks];

  // Null / undefined
  if (values.some((v) => v === null || v === undefined))
    return 'Missing grade values';

  // Must be numbers
  if (values.some((v) => typeof v !== 'number'))
    return 'Grades must be numeric values';

  // Integers only
  if (!values.every(Number.isInteger)) return 'Grades must be integers';

  // Final grade validation
  if ([mid, final, tasks, bonus].reduce((acc, cur) => acc + cur, 0) > 100)
    return 'Final Grade must be between 0 and 100';

  // Ranges
  if (attendance < 0 || attendance > 100)
    return 'Attendance must be between 0 and 100';

  if (mid < 0 || mid > 30) return 'Midterm must be between 0 and 30';

  if (final < 0 || final > 50) return 'Final must be between 0 and 50';

  if (tasks < 0 || tasks > 20) return 'Tasks must be between 0 and 20';

  return 'valid';
}

function calculateTotal(s) {
  return s.mid + s.final + s.tasks;
}

function getRowClass(finalGrade) {
  if (finalGrade >= 90) return 'gold';
  if (finalGrade >= 60) return 'green';
  return 'red';
}

function addBonus(index) {
  const student = students[index];

  let bonus = prompt('Enter bonus value for ' + student.name);

  if (bonus === '' || isNaN(bonus))
    return alert('Bonus must be a valid number');

  bonus = Number(bonus);

  if (!Number.isInteger(bonus)) return alert('Bonus must be an integer');

  if (bonus <= 0) return alert('Bonus must be positive');

  const total = calculateTotal(student);

  if (total + student.bonus + bonus > 100)
    return alert('Final grade cannot exceed 100');

  student.bonus += bonus;

  renderTable();
  toggleDetails();
}

function toggleDetails(index = null) {
  const details = document.getElementById('studentDetails');
  details.style.display = 'none';
  const allDetailsBtns = document.querySelectorAll('.details-btn');
  allDetailsBtns.forEach((b) => {
    if (b.id !== `btn-${index}`) b.textContent = 'Show Details';
  });
  if (index === null) return;
  const s = students[index];
  const detailsBtn = document.querySelector(`#btn-${index}`);

  if (detailsBtn.textContent === 'Hide Details') {
    details.style.display = 'none';
    detailsBtn.textContent = 'Show Details';
  } else {
    details.style.display = 'block';
    detailsBtn.textContent = 'Hide Details';
  }

  details.innerHTML = `
    <h3>Student Details</h3>
    <p><strong>Name:</strong> ${s.name}</p>
    <p><strong>Attendance:</strong> ${s.attendance}%</p>
    <p><strong>Midterm:</strong> ${s.mid} / 30</p>
    <p><strong>Final:</strong> ${s.final} / 50</p>
    <p><strong>Tasks Avg:</strong> ${s.tasks} / 20</p>
    <p><strong>Total:</strong> ${calculateTotal(s)} / 100</p>
    <p><strong>Bonus:</strong> ${s.bonus}</p>
    <p><strong>Final Grade:</strong> ${calculateTotal(s) + s.bonus} / 100</p>
  `;
}

function renderTable() {
  const tbody = document.getElementById('studentsTable');
  tbody.innerHTML = '';

  students.forEach((s, i) => {
    const valid = validateGrades(s);
    if (valid !== 'valid') {
      return (tbody.innerHTML += `
        <tr class="red">
          <td colspan="9">${s.name} — ${valid}</td>
        </tr>
      `);
    }

    const total = calculateTotal(s);
    const finalGrade = total + s.bonus;
    const rowClass = getRowClass(finalGrade);

    tbody.innerHTML += `
      <tr class="${rowClass}">
        <td>${s.name}</td>
        <td>${s.attendance}%</td>
        <td>${s.mid}</td>
        <td>${s.final}</td>
        <td>${s.tasks}</td>
        <td>${total} + ${s.bonus}</td>
        <td>${finalGrade}</td>
        <td>
          <button class="bonus-btn" onclick="addBonus(${i})">Add Bonus</button>
          <button class="details-btn" id='btn-${i}' onclick="toggleDetails(${i})">Show Details</button>
        </td>
      </tr>
    `;
  });
}

renderTable();
