# Student Management System

## Project Overview

A simple Student Management System built using HTML, Bootstrap, JavaScript, and Toastify. The system helps manage student records, calculate grades automatically, and display useful statistics such as average mark, top student, and lowest student.

---

## Features

* Add new student (name and mark)
* Update existing student data
* Delete student records
* Search students by name (real-time)
* Automatic GPA calculation based on student mark
* Display statistics:

  * Average mark of all students
  * Top student (highest mark)
  * Lowest student (lowest mark)
* Toast notifications for all actions and validations

---

## GPA Calculation Rules

| Mark Range | Grade     |
| ---------- | --------- |
| 85 – 100   | Excellent |
| 75 – 84    | Very Good |
| 65 – 74    | Good      |
| 50 – 64    | Pass      |
| Below 50   | Fail      |

---

## Statistics Logic

* **Average Mark**

  Average = Total Marks of All Students / Number of Students

* **Top Student**

  The student who has the highest mark

* **Lowest Student**

  The student who has the lowest mark

---

## Technologies Used

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (Vanilla JS)
* Toastify.js

---

## Project Structure

```
project/
│
├── index.html
├── public/
│   └── script.js
└── README.md
```

---

## How to Run the Project

1. Download or clone the project files
2. Open the `index.html` file in any modern web browser
3. Start adding and managing students

---

## Validation Rules

* Student name must not be empty
* Student mark must be between 0 and 100
* Error messages are shown using toast notifications

---

## Notes

* All data is stored in memory (no database or local storage)
* Refreshing the page will reset the data
* Suitable for academic projects and JavaScript practice

---
## Author

**Developed by [Amr Mohammed](http://github.com/amrmohamed-dev).**