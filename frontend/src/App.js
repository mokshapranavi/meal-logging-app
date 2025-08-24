import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MealLog from './components/MealLog';
import MealHistory from './components/MealHistory';
import NutritionStatus from './components/NutritionStatus';
import WebhookSimulator from './components/WebhookSimulator';
import Profile from './components/Profile';
import BmrDisplay from './components/BmrDisplay';
import './App.css';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [bmr, setBmr] = useState(null);
  const calculateBMR = (userData) => {
    if (!userData) return null;
    const { gender, weight, height } = userData;
    let age = 0;
    if (userData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(userData.dateOfBirth);
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }
    if (gender && weight && height && age) {
      if (gender.toLowerCase() === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
      }
    }
    return null;
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      fetchUser();
    }
  }, [token]);
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/profile');
      const userData = res.data.data.user;
      setUser(userData);
      const userBMR = calculateBMR(userData);
      setBmr(userBMR);
    } catch (err) {
      console.error('Error fetching user:', err);
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const userData = JSON.parse(jsonPayload);
          setUser(userData);
          const userBMR = calculateBMR(userData);
          setBmr(userBMR);
        } catch (error) {
          console.error('Error decoding token:', error);
          logout();
        }
      }
    }
  };
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setBmr(null);
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  };
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Meal Logging App</h1>
          <div className="header-right">
            {isAuthenticated && bmr && <BmrDisplay bmr={bmr} />}
            {isAuthenticated && (
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            )}
          </div>
        </header>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Login login={login} />}
          </Route>
          <Route path="/register">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Register login={login} />}
          </Route>
          {isAuthenticated && (
            <>
              <Route 
                path="/dashboard" 
                render={(props) => <Dashboard {...props} bmr={bmr} />} 
              />
              <Route 
                path="/log-meal" 
                render={(props) => <MealLog {...props} bmr={bmr} />} 
              />
              <Route 
                path="/meal-history" 
                render={(props) => <MealHistory {...props} bmr={bmr} />} 
              />
              <Route 
                path="/nutrition-status" 
                render={(props) => <NutritionStatus {...props} bmr={bmr} />} 
              />
              <Route 
                path="/webhook-simulator" 
                render={(props) => <WebhookSimulator {...props} bmr={bmr} />} 
              />
              <Route 
                path="/profile" 
                render={(props) => <Profile {...props} bmr={bmr} />} 
              />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}
export default App;
