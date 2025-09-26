export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} The Solution Network</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-600">FAQ</a>
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}