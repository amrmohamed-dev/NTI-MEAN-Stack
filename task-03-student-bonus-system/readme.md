# Students Bonus System

## Project Overview

A simple **Students Bonus Management System** built using **HTML, CSS, and Vanilla JavaScript**.
The system manages student records, calculates grades automatically, and allows adding manual bonus points with full validation rules and visual status indicators.

The system highlights student performance levels and prevents invalid input such as negative values, exceeding grade limits, or null values.

---

## Features

* Display students in a responsive HTML table
* Automatic calculation of:

  * Total grade
  * Bonus points
  * Final grade (Total + Bonus)
* Status highlighting based on final grade:

  * Green → Passed (≥ 60)
  * Red → Failed (< 60)
  * Gold → Excellent (≥ 90)
* Add manual bonus value per student
* Show student full details in popup alert
* Validation checks to prevent invalid data

---

## Bonus & Grade Validation Rules

Before applying bonus, the system validates:

* Student must exist
* Bonus value must be:

  * A valid number
  * Integer value
  * Positive number
* Final grade must not exceed 100
* All student grades must:

  * Be integers
  * Be within range (0 – 100)
  * Not contain `null` or `undefined` values

Invalid records are flagged automatically in the table.

---

## Grade Status Rules

| Final Grade | Status    | Color |
| ----------- | --------- | ----- |
| 90 – 100    | Excellent | Gold  |
| 60 – 89     | Pass      | Green |
| Below 60    | Fail      | Red   |

---

## Technologies Used

* HTML5
* CSS3 (Lightweight & Responsive)
* JavaScript (Vanilla JS)

No frameworks or UI libraries were used to keep the project simple and lightweight.

---

## Project Structure

```
project/
│
├── index.html
├── public/
│   ├── script.js
│   └── style.css
└── README.md
```

---

## How to Run the Project

1. Download or clone the project files
2. Place all files in the same folder
3. Open `index.html` in any modern web browser
4. The system will load automatically

---

## Responsive Design

* Table supports horizontal scrolling on small screens
* Font sizes and spacing adjust for mobile
* Buttons are optimized for touch devices

This makes the project suitable for:

* Desktop
* Tablet
* Mobile devices

---

## Validation Logic Summary

The system prevents:

* Negative bonus values
* Non-integer inputs
* Null / undefined values
* Grades outside valid range
* Final grade exceeding 100

Error messages are shown using alerts.

---

## Notes

* Data is stored in memory (no database or local storage yet)
* Refreshing the page will reset values
* Suitable for academic projects & JavaScript practice
* Code is clean, readable, and easily extendable

---

## Author

**Developed by [Amr Mohammed](http://github.com/amrmohamed-dev).**
