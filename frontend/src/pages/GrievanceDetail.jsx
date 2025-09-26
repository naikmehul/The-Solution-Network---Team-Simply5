import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGrievance, deleteGrievance } from "../api";

export default function GrievanceDetail() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchGrievance(id).then(setGrievance); }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete grievance?")) {
      await deleteGrievance(id);
      navigate("/");
    }
  };

  if (!grievance) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">{grievance.title}</h1>
      <p className="text-gray-600">{grievance.location}</p>
      <p className="mt-4">{grievance.description}</p>
      <p className="mt-4">Status: <span>{grievance.status}</span></p>
      <button onClick={handleDelete} className="mt-6 px-3 py-1 bg-red-500 text-white rounded">Delete</button>
    </div>
  );
}