import axios from "axios";

// 🚀 பேக்கண்ட் மெயின் URL (Render லிங்க்)
const API = "https://auth-api-dnbf.onrender.com";

// 1. காலம்களைக் கொண்டு வர (Get Columns) - பாத்: /columns/board/:boardId ஆக மாற்றப்பட்டுள்ளது
export const getColumns = (boardId) =>
  axios.get(`${API}/columns/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });