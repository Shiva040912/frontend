import axios from "axios";

// 🚀 பேக்கண்ட் மெயின் URL (Render லிங்க்)
const BACKEND_URL = "https://auth-api-dnbf.onrender.com"; 

// 1. போர்டுகளைக் கொண்டு வர (Get Boards)
export const getBoards = (projectId) =>
  axios.get(`${BACKEND_URL}/project/${projectId}`, { // 🚀 இப்போ கரெக்ட்டா Render லிங்க்கை கூப்பிடும்!
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 2. புது போர்டு கிரியேட் பண்ண (Create Board)
export const createBoard = (data) =>
  axios.post(`${BACKEND_URL}/boards`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 3. போர்டை அப்டேட் பண்ண (Update Board)
export const updateBoard = (id, data) =>
  axios.patch(`${BACKEND_URL}/boards/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 4. போர்டை டெலிட் பண்ண (Delete Board)
export const deleteBoard = (id) =>
  axios.delete(`${BACKEND_URL}/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });