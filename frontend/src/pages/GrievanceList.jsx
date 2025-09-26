import { useEffect, useState } from "react";
import { fetchGrievances } from "../api";
import GrievanceCard from "../components/GrievanceCard";

export default function GrievanceList() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances().then(setGrievances);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-8 shadow mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the <span className="text-blue-600">Grievance Portal</span>
        </h1>
        <p className="mt-2 text-gray-600">
          View, track, and submit civic issues to help improve your community.
        </p>
      </section>

      {/* List Section */}
      <h2 className="text-2xl font-semibold mb-4">All Grievances</h2>

      {grievances.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white shadow rounded-xl">
          <p className="text-gray-600 text-lg font-medium">
            👋 No grievances have been submitted yet.
          </p>
          <p className="mt-2 text-gray-500">
            Be the first to raise a concern and make a difference in your community.
          </p>
          <p className="mt-1 text-gray-400 text-sm italic">
            "Your voice matters – let’s solve civic issues together."
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grievances.map((g) => (
            <GrievanceCard key={g.id} grievance={g} />
          ))}
        </div>
      )}
    </div>
  );
}