// src/services/api.js
const API_BASE = "http://localhost:5000/api";

export async function getIssues() {
  const res = await fetch(`${API_BASE}/issues`);
  return res.json();
}

export async function getIssueById(id) {
  const res = await fetch(`${API_BASE}/issues/${id}`);
  return res.json();
}
