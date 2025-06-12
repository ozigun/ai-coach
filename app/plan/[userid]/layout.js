import { FaDumbbell, FaChartLine, FaAppleAlt, FaCog } from "react-icons/fa";

export default function UserDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-8 space-y-8 shadow-xl rounded-r-3xl">
        <h2 className="text-3xl font-extrabold tracking-wide mb-8 select-none">
          Fitness<span className="text-pink-400">Pro</span>
        </h2>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md">
            <FaDumbbell className="text-xl" />
            <span className="font-semibold text-lg">Workout Plan</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md">
            <FaChartLine className="text-xl" />
            <span className="font-semibold text-lg">Progress</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md">
            <FaAppleAlt className="text-xl" />
            <span className="font-semibold text-lg">Nutrition</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md">
            <FaCog className="text-xl" />
            <span className="font-semibold text-lg">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 shadow-2xl min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
