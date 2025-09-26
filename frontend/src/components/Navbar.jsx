import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        The Solution Network
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/new" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Grievance
        </Link>
        {user ? (
          <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Logout</button>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">Login</Link>
        )}
      </div>
    </nav>
  );
}