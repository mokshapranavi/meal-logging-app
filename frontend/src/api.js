const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};
