# TechEazy Internship – Zero Mile Delivery System

This is a fullstack Parcel Management System built as part of the TechEazy internship selection process.

---

## 📁 Project Structure

```
tech_eazy_fullstack_Pradeep0997/
├── backend/
│ ├── server.js
│ ├── parcel/
│ │ ├── parcelModel.js
│ │ ├── parcelService.js
│ │ └── parcelController.js
│ ├── db/parcel.db
│ ├── package.json
│ └── postman_collection.json
├── frontend/
│ ├── index.html
│ ├── app.js
│ └── style.css

```

---

## 🚀 How to Run the Project

### 🔧 Backend (Node.js + Express + Sequelize + SQLite)

1. Go to the backend folder
```bash
cd backend
npm install
npm run dev
Backend runs at: http://localhost:3000

🖥 Frontend (HTML + Axios)
Open the frontend/index.html in browser (use Live Server or port 80)

If needed:


cd frontend
sudo python3 -m http.server 80
Frontend runs at: http://localhost

```

## 📬 API Endpoints
Method	Endpoint	Description
GET	/parcels	List all parcels
GET	/parcels/:id	Get parcel by tracking ID
POST	/parcels	Create new parcel
PUT	/parcels/:id	Update parcel
DELETE	/parcels/:id	Delete parcel


---

## 📮 Postman Collection

You can import postman_collection.json in Postman to test the APIs manually.


---
## 💡 Tech Stack

Node.js

Express

Sequelize ORM

SQLite

Axios

HTML, CSS, JavaScript



## ✍️ Author


Settipalle Pradeep Reddy


GitHub: Pradeep0997

