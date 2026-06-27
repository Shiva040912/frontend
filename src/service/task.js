import axios from "axios";

// 🚀 '/tasks' எண்ட்-பாயிண்ட் சேர்க்கப்பட்டுள்ளது
const API = "https://auth-api-dnbf.onrender.com/tasks"; 

export const getTasks = (boardId) =>
  axios.get(`https://auth-api-dnbf.onrender.com/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const createTask = (data) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 💡 Drag and Drop செய்யும் போது இந்த updateTask தான் பேக்கண்டில் காலாகும்!
export const updateTask = (id, data) =>
  axios.patch(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteTask = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });