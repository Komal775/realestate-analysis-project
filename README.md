# 🏡 Real Estate Analysis Chatbot  
A full-stack web application that analyzes Pune real estate data using natural language queries.  
Built with **Django REST Framework**, **React**, **Pandas**, and **Excel data processing**.

---

## 🚀 Features

### 🔎 **1. Natural Language Query Support**
You can type simple queries such as:
- **Analyze Wakad**
- **Show price trend for Baner**
- **Compare Aundh and Ambegaon Budruk**
- **Show last 3-year analysis for Akurdi**

The backend intelligently extracts the location and performs analysis.

---

### 📊 **2. Dynamic Data Analysis**
The system reads an Excel sheet and provides:

- Average price  
- Average demand (units)  
- Year-wise trend  
- Price change  
- Summary explanation  

---

### 📈 **3. Visual Charts**
React frontend shows:
- Line chart for price growth  
- Line chart for demand  
- Dynamic labels and datasets  

---

### 📋 **4. Data Table**
A clean table displaying:
- Locality  
- Year  
- Flat weighted average rate  
- Total units  
- City  

---

### 📥 **5. CSV Download Feature**
Users can download the analyzed dataset as a `.csv` file.

---

## 🏗️ **Tech Stack**

### **Backend**
- Django 5  
- Django REST Framework  
- Pandas  
- Python  
- Excel Integration  

### **Frontend**
- React (Vite)  
- Chart.js  
- Axios  

---

## 🗂️ Project Structure

realestate-analysis-project/
│
├── realestate-backend/
│ ├── api/
│ │ ├── views.py
│ │ ├── urls.py
│ │ ├── data/realestate.xlsx
│ └── realestate/
│
└── realestate-frontend/
├── src/
│ ├── App.jsx
│ ├── components/
└── public/


---

## ▶️ **How to Run the Project**

### **1️⃣ Start Backend**
```bash
cd realestate-backend
venv\Scripts\activate
python manage.py runserver
Backend runs on:
👉 http://127.0.0.1:8000/

2️⃣ Start Frontend
cd realestate-frontend
npm install   # only first time
npm run dev

Frontend runs on:
👉 http://localhost:5173/

🎥 Demo Video
A demonstration video of the working chatbot is included below:
👉 [Click to watch demo video](./Screen Recording 2025-11-21 182335.mp4)
This video shows:


Starting frontend and backend


Sending real queries


Analysis output


Tables and charts


CSV download



📦 Submission Contents
This repository contains:


Full Django backend


Full React frontend


Excel dataset


Demo video


ZIP file (as required by assignment)



✨ Author
Komal Nimbalkar
Full Stack Developer Applicant – Sigmavalue Technologies



