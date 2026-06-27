import axios from "axios";

// 🚀 பேக்கண்ட் மெயின் URL (Render லிங்க்)
const API = "https://auth-api-dnbf.onrender.com"; 

// 1. டாஸ்க்குகளைக் கொண்டு வர (Get Tasks) - பாத்: /tasks/board/:boardId ஆக மாற்றப்பட்டுள்ளது
export const getTasks = (boardId) =>
  axios.get(`${API}/tasks/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 2. புது டாஸ்க் கிரியேட் பண்ண (Create Task)
export const createTask = (data) =>
  axios.post(`${API}/tasks`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 3. டாஸ்க்கை அப்டேட் பண்ண (Update Task)
export const updateTask = (id, data) =>
  axios.patch(`${API}/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 4. டாஸ்க்கை டெலிட் பண்ண (Delete Task)
export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });