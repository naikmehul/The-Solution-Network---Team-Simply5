import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change when deploying
});

// ---- Issues ----
export const getIssues = () => API.get("/issues");
export const getIssueById = (id) => API.get(`/issues/${id}`);

// ---- Users (future use) ----
export const getUsers = () => API.get("/users");

// ---- Auth (future use) ----
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

export default API;
