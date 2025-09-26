import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import GrievanceList from "./pages/GrievanceList";
import NewGrievance from "./pages/NewGrievance";
import GrievanceDetail from "./pages/GrievanceDetail";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<GrievanceList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewGrievance />} />
          <Route path="/grievances/:id" element={<GrievanceDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;