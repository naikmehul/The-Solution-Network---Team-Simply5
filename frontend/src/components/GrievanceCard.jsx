import { Link } from "react-router-dom";

export default function GrievanceCard({ grievance }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{grievance.title}</h2>
      <p className="text-sm text-gray-500">{grievance.location}</p>
      <p className="mt-2 text-sm text-gray-700">{grievance.description}</p>
      <span className={`inline-block mt-2 px-3 py-1 text-xs text-white rounded ${
        grievance.status === "open" ? "bg-red-500" :
        grievance.status === "in_progress" ? "bg-yellow-500" : "bg-green-600"}`}>
        {grievance.status}
      </span>
      <Link to={`/grievances/${grievance.id}`} className="block mt-3 text-blue-600 hover:underline">View details →</Link>
    </div>
  );
}