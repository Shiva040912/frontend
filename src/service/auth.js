import axios from "axios";

const API = "https://auth-api-dnbf.onrender.com";

export const registerUser = (data) =>
  axios.post(`${API}/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/auth/login`, data);