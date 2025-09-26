import { useEffect, useState } from "react";
import { fetchGrievances } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances().then(setGrievances);
  }, []);

  // stats
  const stats = {
    total: grievances.length,
    open: grievances.filter((g) => g.status === "open").length,
    inProgress: grievances.filter((g) => g.status === "in_progress").length,
    resolved: grievances.filter((g) => g.status === "resolved").length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="bg-brandPink rounded-lg p-10 text-center shadow mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Track & Monitor Your <span className="text-brandBlue">Complaints</span>
        </h1>
        <p className="mt-2 text-gray-600">
          Helping citizens raise issues and follow their status in real time.
        </p>
      </section>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <StatCard label="Total Complaints" value={stats.total} color="bg-blue-500" />
        <StatCard label="Open" value={stats.open} color="bg-red-500" />
        <StatCard label="In Progress" value={stats.inProgress} color="bg-yellow-500" />
        <StatCard label="Resolved" value={stats.resolved} color="bg-green-600" />
      </div>

      {/* Categories (link to /new with pre-filled category) */}
      <h2 className="text-2xl font-semibold mb-4">Report a Complaint</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <CategoryCard title="Road Problem" img="https://cdn-icons-png.flaticon.com/512/1533/1533929.png" />
        <CategoryCard title="Garbage Problem" img="https://cdn-icons-png.flaticon.com/512/2921/2921822.png" />
        <CategoryCard title="Sewage Problem" img="https://cdn-icons-png.flaticon.com/512/483/483356.png" />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-6 rounded-lg shadow text-white ${color}`}>
      <h2 className="text-lg">{label}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function CategoryCard({ title, img }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
      <img src={img} alt={title} className="h-20 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <Link
        to={`/new?category=${encodeURIComponent(title)}`}
        className="mt-3 inline-block px-4 py-2 bg-brandBlue text-white rounded hover:bg-blue-700"
      >
        Report
      </Link>
    </div>
  );
}