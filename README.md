# 🚗 Smart Parking Slot Booking System

An Online Smart Parking Slot Booking System built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**. The system allows users to register, log in, search for parking locations, book available parking slots, view booking history, and manage their profile.

---

# 📌 Features

## 👤 User Module

- User Registration
- User Login (JWT Authentication)
- Secure Password Hashing (bcrypt)
- User Profile
- Logout
- Booking History

---

## 🅿 Parking Module

- Add Parking
- View All Parking
- Search Parking by Location
- View Parking Availability
- Update Parking
- Delete Parking

---

## 📅 Booking Module

- Book Parking Slot
- Automatic Available Slot Update
- Prevent Booking if Slots are Full
- Booking History API
- Store Vehicle Number
- Booking Date & Time

---

## 🔐 Authentication

- JWT Token Authentication
- Protected Routes
- User Authorization
- LocalStorage Token Handling

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

---

# 📂 Project Structure

```
Online Parking Management System
│
├── Frontend
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── profile.html
│   ├── 02_find_parking.html
│   └── style.css
│
├── middleware
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models
│   ├── User.js
│   ├── Parking.js
│   └── Booking.js
│
├── routes
│   ├── userRoutes.js
│   ├── parkingRoutes.js
│   └── bookingRoutes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# ⚙ Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside project

```bash
cd Online-Parking-Management-System
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/parkingdb

JWT_SECRET=your_secret_key
```

Start server

```bash
node server.js
```

or

```bash
nodemon server.js
```

---

# 📡 API Endpoints

## User

### Register

```
POST /api/users/register
```

### Login

```
POST /api/users/login
```

---

## Parking

### Get All Parking

```
GET /api/parking
```

### Search Parking

```
GET /api/parking/search/:location
```

### Parking Availability

```
GET /api/parking/availability/:id
```

### Add Parking

```
POST /api/parking/add
```

### Update Parking

```
PUT /api/parking/update/:id
```

### Delete Parking

```
DELETE /api/parking/delete/:id
```

---

## Booking

### Book Slot

```
POST /api/bookings/book
```

### My Bookings

```
GET /api/bookings/my-bookings
```

### Booking History

```
GET /api/bookings/history
```

---

# 🔒 Authentication

Protected APIs require JWT Token.

Example Header

```
Authorization: Bearer YOUR_TOKEN
```

---

# 🖥 Frontend Pages

- Home
- Register
- Login
- Find Parking
- Profile

---

# 📦 Installed Packages

```
express
mongoose
jsonwebtoken
bcryptjs
dotenv
cors
nodemon
```

---

# 📸 Screens

- Home Page
- Login Page
- Register Page
- Find Parking
- Profile Page

---

# 🚀 Future Improvements

- Admin Dashboard
- Role-Based Access Control
- QR Code Entry
- Online Payment Gateway
- Live Parking Map
- Booking Cancellation
- Email Notifications
- Responsive UI
- Razorpay Integration
- Google Maps API

---

# 👨‍💻 Author

**Rakesh Kumar**

---

# 📄 License

This project is developed for learning and educational purposes.