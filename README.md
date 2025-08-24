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

## 📡 API Endpoints

### 🔑 Authentication
- **POST** `/api/auth/register` → Register new user  
- **POST** `/api/auth/login` → Login user  

---

### 🍴 Meals
- **POST** `/api/log_meals` → Log a meal  
- **GET** `/api/meals?date=YYYY-MM-DD` → Fetch meals for date  
- **GET** `/api/status/:userId?date=YYYY-MM-DD` → Nutrition summary  

---

### 👤 Profile
- **GET** `/api/profile` → Get profile  
- **PATCH** `/api/profile` → Update profile  
- **PATCH** `/api/change-password` → Change password  

---

### 📲 Webhook
- **POST** `/api/webhook` → Simulate WhatsApp meal logging  

---

## 🥗 Food Database
Example nutrition values:
```json
{
  "Jeera Rice": {"calories": 250, "protein": 5, "carbs": 45, "fiber": 2},
  "Dal": {"calories": 180, "protein": 12, "carbs": 20, "fiber": 5},
  "Cucumber": {"calories": 16, "protein": 1, "carbs": 4, "fiber": 1}
}
```
## 🔬 BMR Calculation

**Mifflin-St Jeor Equation**

- **Male**:  
BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)

- **Female**:  
BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)


---

## ☁️ Deployment

### 🚀 Heroku (Backend)
```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
heroku config:set JWT_EXPIRES_IN=90d
git push heroku main
```

### 🌐 Netlify (Frontend)

```bash
npm run build
```

- Deploy the `/build` folder → **Netlify**

---

## 🔑 Environment Variables

| Variable         | Description                     |
|------------------|---------------------------------|
| `MONGODB_URI`    | MongoDB Atlas connection string |
| `JWT_SECRET`     | JWT signing secret              |
| `JWT_EXPIRES_IN` | Expiry (e.g., `90d`)            |
| `NODE_ENV`       | Set to `production` in prod     |
