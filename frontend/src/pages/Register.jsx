import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", mobile: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.fname && form.mobile && form.password) {
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/");
    } else {
      alert("Fill required fields");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-xl text-center font-semibold mb-6">Citizen Sign Up</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fname" placeholder="First Name *" className="border rounded px-3 py-2" value={form.fname} onChange={handleChange} />
          <input name="lname" placeholder="Last Name *" className="border rounded px-3 py-2" value={form.lname} onChange={handleChange} />
          <input name="email" placeholder="Email" className="border rounded px-3 py-2" value={form.email} onChange={handleChange} />
          <input name="mobile" placeholder="Mobile *" className="border rounded px-3 py-2" value={form.mobile} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password *" className="border rounded px-3 py-2 col-span-2" value={form.password} onChange={handleChange} />
          <div className="col-span-2 flex items-center space-x-2">
            <input type="checkbox" required /> 
            <span className="text-sm text-gray-600">I agree to Terms & Conditions</span>
          </div>
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}