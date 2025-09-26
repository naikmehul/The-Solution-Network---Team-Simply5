import { useState, useEffect } from "react";
import { createGrievance } from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NewGrievance() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Prefill title if category exists in URL (from Dashboard cards)
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setTitle(category);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }
    await createGrievance({ title, description, location });
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Complaint Title"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Describe Issue"
          className="w-full border rounded px-3 py-2"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}