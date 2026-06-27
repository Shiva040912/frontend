import axios from "axios";

// 🚀 '/boards' எண்ட்-பாயிண்ட் சேர்க்கப்பட்டுள்ளது
const API = "https://auth-api-dnbf.onrender.com/boards"; 

export const getBoards = (projectId) =>
  axios.get(`https://auth-api-dnbf.onrender.com/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const createBoard = (data) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateBoard = (id, data) =>
  axios.patch(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteBoard = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });