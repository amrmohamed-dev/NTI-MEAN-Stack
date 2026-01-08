# Shopping Cart System

## Project Overview

A fully-functional **Shopping Cart Management System** built using **HTML, CSS, and Vanilla JavaScript**.

The system simulates an e-commerce cart workflow using:

* **Stack behavior** for the Cart (Last In → First Out / Undo)
* **Queue behavior** for Waiting Orders (First In → First Out)
* **Login modal system with session persistence**
* **Toast notifications instead of alerts**
* **LocalStorage data saving & restoring**

The application demonstrates:

* DOM manipulation
* Error handling
* Data validation
* State synchronization across reloads

---

## Features

* Display products dynamically from an array of objects
* Add products to Cart (Stack-Based structure)
* Queue extra products when cart capacity is full
* Undo last added product
* Checkout system with total price calculation
* Prevent adding duplicate products
* Disable Buy button when product already exists
* Restore cart & queue from LocalStorage after reload
* Toast messages for all system actions
* Login modal with username persistence
* Logout system with session reset
* Responsive & mobile-friendly layout

---

## Cart & Queue Logic

### 🟢 Cart (Stack – LIFO)

* Maximum capacity = **3 items**
* Last item added → First item removed via Undo

### 🟡 Queue (FIFO)

* Extra items are stored in Queue
* When Undo frees space → First queued item moves to Cart automatically

---

## System Behavior Flow

| Action                           | Result                                           |
| -------------------------------- | ------------------------------------------------ |
| Add product while cart has space | Added to Cart                                    |
| Add product when cart is full    | Added to Queue                                   |
| Undo last product                | Removed from Cart + First Queue item moves in    |
| Checkout                         | Clears cart then fills from Queue (if available) |
| Reload page                      | Data is restored from LocalStorage               |

---

## Validation & Error Handling

The system prevents:

* Using the system without login
* Adding duplicate products
* Undo while cart is empty
* Checkout with an empty cart

Messages are displayed using **Toastify UI notifications**.

---

## Login System

* Login displayed using a modal popup
* Username is stored in LocalStorage
* Welcome message persists across refresh
* Logout clears session & returns to login screen

---

## Technologies Used

* HTML5
* CSS3 (Lightweight & Responsive design)
* JavaScript (Vanilla JS)
* Toastify.js notifications
* LocalStorage (BOM)

No frameworks were used to keep the project simple and educational.

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

1. Download or clone the repository
2. Place all files in the same directory
3. Open `index.html` in any modern browser
4. Login to start using the system

Data and session state are restored automatically on reload.

---

## Responsive Design

The layout adapts to:

* Desktop
* Tablet
* Mobile devices

Enhancements include:

* Grid layout adjustments
* Buttons stack on smaller screens
* Offer bar becomes full-width on mobile
* Modal remains centered on all viewports

---

## System Behavior Summary

The project demonstrates:

* Stack & Queue data structures in UI context
* Dynamic DOM rendering
* Login + Logout workflow
* Persistent application state
* Realistic e-commerce cart simulation

---

## Notes

* Product data is stored locally in the script
* No backend or database required
* Logic is clean and easily extendable

---

## Author

**Developed by [Amr Mohammed](http://github.com/amrmohamed-dev).**
