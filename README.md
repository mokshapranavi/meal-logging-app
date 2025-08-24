# 🍽️ Meal Logging Application

A full-stack **MERN** application for logging meals, tracking nutrition, and monitoring your **Basal Metabolic Rate (BMR)**.  
This application helps users maintain a healthy lifestyle by providing insights into dietary habits and nutritional intake.

---

## 🚀 Features
- **User Authentication**: Secure registration and login with JWT tokens  
- **Meal Logging**: Log breakfast, lunch, dinner, and snacks with food items  
- **Nutrition Tracking**: Automatic calculation of calories, protein, carbs, and fiber  
- **BMR Calculation**: Personalized Basal Metabolic Rate calculation based on user profile  
- **Meal History**: View past meals with filtering by date  
- **Profile Management**: Update personal information and change password  
- **Webhook Simulator**: Test message-based meal logging (simulating WhatsApp integration)  
- **Responsive Design**: Works seamlessly on desktop and mobile devices  

---

## 🛠️ Technologies Used

### Frontend
- React.js  
- React Router (navigation)  
- Axios (API calls)  
- CSS3 (styling)  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose ODM  
- JWT (authentication)  
- bcryptjs (password hashing)  
- CORS (cross-origin requests)  

### Database
- MongoDB Atlas (cloud database)

---

## 📦 Prerequisites
Before running the app, ensure you have:
- Node.js **v14+**  
- npm **v6+**  
- MongoDB Atlas account (or local MongoDB installation)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/meal-logging-app.git
cd meal-logging-app
```
### 2. Backend Setup
```bash
cd backend
npm install
touch .env
```
Add the following to .env:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=90d
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. MongoDB Setup
Create a free MongoDB Atlas account

Create a cluster & user (read/write access)

Whitelist IP (or use 0.0.0.0/0 for dev)

Copy connection string → paste in .env

## ▶️Running the Application

### Development Mode
```bash
# Backend (in backend directory)
npm run dev

# Frontend (in frontend directory)
npm start
```
Frontend: http://localhost:3000

Backend API: http://localhost:5000

### Production Mode
```bash
cd frontend
npm run build
cd ../backend
npm start
```
