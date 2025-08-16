import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Local Grievance App</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/issues">Issues</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
