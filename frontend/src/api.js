const API_BASE = "http://localhost:4000/api";

export async function fetchGrievances() {
  const res = await fetch(`${API_BASE}/grievances`);
  return res.json();
}

export async function fetchGrievance(id) {
  const res = await fetch(`${API_BASE}/grievances/${id}`);
  return res.json();
}

export async function createGrievance(data) {
  const res = await fetch(`${API_BASE}/grievances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGrievance(id) {
  return fetch(`${API_BASE}/grievances/${id}`, { method: "DELETE" });
}