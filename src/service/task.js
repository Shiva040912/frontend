import axios from "axios";

// பேஸ் URL மட்டும் வைப்போம்
const API = "https://auth-api-dnbf.onrender.com"; 

export const getTasks = (boardId) =>
  axios.get(`${API}/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const createTask = (data) =>
  axios.post(`${API}/tasks`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateTask = (id, data) =>
  axios.patch(`${API}/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });