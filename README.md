# Zero Mile Delivery System — From Warehouse to Doorstep

A full-stack MERN-based logistics management system developed as part of the TechEazy internship. The system enables authentication, vendor management, parcel tracking, and delivery order uploads.

---

## 🌐 Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** express-fileupload
- **Others:** dotenv, cors

---

## 📁 Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── App.jsx
│ └── package.json
├── resources/
│ └── Postman_Collection.json
└── README.md



---

## 🧠 Features

- 🔐 User login/register with JWT auth
- 📦 Parcel CRUD (Create, Read, Update, Delete)
- 🏪 Vendor listing with subscription info
- 📄 Delivery Order upload (.txt) with file parsing
- 🔎 Filter and download delivery orders
- 📂 File upload stored locally in `/uploads`
- ✅ Protected frontend routes (React Router)

---

## 🛠️ Installation

### 📦 Backend Setup

```
cd backend
npm install
Create a .env file inside /backend:

env
Copy
Edit
DB_NAME=techeazy_db
DB_USER=techeazy_user
DB_PASS=techeazy_pass
DB_HOST=localhost
JWT_SECRET=supersecretkey
PORT=3000
Create PostgreSQL DB and user:


CREATE USER techeazy_user WITH PASSWORD 'techeazy_pass';
CREATE DATABASE techeazy_db;
GRANT ALL PRIVILEGES ON DATABASE techeazy_db TO techeazy_user;
Run server:


node server.js
Make sure the /uploads folder exists in the backend root for file upload to work.

🖼️ Frontend Setup

cd frontend
npm install
Start frontend (usually on port 81):


npm start
📮 API Endpoints
Base URL: http://localhost:3000/api

✅ Auth
POST /auth/register → Register new user

POST /auth/login → Login and receive JWT token

📦 Parcels
GET /parcels

POST /parcels

PUT /parcels/:id

DELETE /parcels/:id

🏪 Vendors
GET /vendors → Requires JWT

🚚 Delivery Orders
GET /delivery-orders → List all uploaded orders

POST /delivery-orders/upload → Upload .txt file with order lines

