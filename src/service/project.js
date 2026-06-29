import axios from "axios";


const API_URL = "https://auth-api-dnbf.onrender.com/projects"; 

const getToken = () => localStorage.getItem("token");

export const getProjects = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createProject = (data) => {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const updateProject = (id, data) => {
  return axios.patch(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteProject = (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const inviteMember = (projectId, data) => {
  return axios.post(`${API_URL}/${projectId}/invite`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getMembers = (projectId) => {
  return axios.get(`${API_URL}/${projectId}/members`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};