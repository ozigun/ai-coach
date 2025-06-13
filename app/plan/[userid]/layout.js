"use client";

import { useState } from "react";
import {
  FaDumbbell,
  FaChartLine,
  FaAppleAlt,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function UserDashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-blue-800 p-3 rounded-full md:hidden shadow-lg"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
    bg-gradient-to-b from-blue-800 to-blue-900 text-white
    z-40 fixed top-0 left-0 h-full w-72 transform transition-transform duration-300
    flex flex-col items-start p-8 space-y-8 shadow-xl
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 md:flex md:w-72 md:h-auto md:rounded-none md:shadow-none
  `}>
        <h2 className="text-3xl font-extrabold tracking-wide mb-6 select-none w-full text-left">
          Fitness<span className="text-pink-400">Pro</span>
        </h2>

        <nav className="flex flex-col space-y-4 w-full">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition shadow-md w-full">
            <FaDumbbell className="text-xl" />
            <span className="font-semibold text-lg">Workout Plan</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition shadow-md w-full">
            <FaChartLine className="text-xl" />
            <span className="font-semibold text-lg">Progress</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition shadow-md w-full">
            <FaAppleAlt className="text-xl" />
            <span className="font-semibold text-lg">Nutrition</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition shadow-md w-full">
            <FaCog className="text-xl" />
            <span className="font-semibold text-lg">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto ml-0 ">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
