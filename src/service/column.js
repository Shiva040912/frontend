import axios from "axios";

const API = "https://auth-api-dnbf.onrender.com";

export const getColumns = (boardId) =>
  axios.get(`${API}/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });