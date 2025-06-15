"use client";

import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const { userid } = useParams(); // kullanıcı ID'sini al
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (target) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition shadow-md w-full ${
      pathname === target
        ? "bg-blue-500 text-white"
        : "hover:bg-blue-500 text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-blue-700 p-3 rounded-full md:hidden shadow-lg"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        bg-gradient-to-b from-blue-600 to-blue-800 text-white
        z-40 fixed top-0 left-0 h-full w-72 transform transition-transform duration-300
        flex flex-col items-start p-8 space-y-8 shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex md:w-72 md:h-auto md:rounded-none md:shadow-none
      `}>
        <nav className="flex flex-col space-y-4 w-full">
          <a href={`/plan/${userid}`} className={linkClass(`/plan/${userid}`)}>
            <FaDumbbell className="text-xl" />
            <span className="font-semibold text-lg">Workout Plan</span>
          </a>
          <a href="#" className={linkClass("#")}>
            <FaChartLine className="text-xl" />
            <span className="font-semibold text-lg">Progress</span>
          </a>
          <a href="#" className={linkClass("#")}>
            <FaAppleAlt className="text-xl" />
            <span className="font-semibold text-lg">Nutrition</span>
          </a>
          <a
            href={`/plan/${userid}/settings`}
            className={linkClass(`/plan/${userid}/settings`)}>
            <FaCog className="text-xl" />
            <span className="font-semibold text-lg">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto ml-0">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
