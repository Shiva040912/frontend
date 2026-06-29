import axios from "axios";


const BACKEND_URL = "https://auth-api-dnbf.onrender.com"; 


export const getBoards = (projectId) =>
  axios.get(`${BACKEND_URL}/boards/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const createBoard = (data) =>
  axios.post(`${BACKEND_URL}/boards`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const updateBoard = (id, data) =>
  axios.patch(`${BACKEND_URL}/boards/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const deleteBoard = (id) =>
  axios.delete(`${BACKEND_URL}/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }); 