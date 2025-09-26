import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile && password) {
      localStorage.setItem("user", JSON.stringify({ mobile }));
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg">
        {/* Center Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-20 md:h-24 lg:h-28 w-auto" />
        </div>
        <h2 className="text-xl text-center font-semibold mb-6">Citizen Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Mobile Number" className="w-full border rounded px-3 py-2" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          New user? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}