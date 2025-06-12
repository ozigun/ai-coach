"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isLogged);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-2xl font-bold">AI Workout Plan Generator</h1>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 font-semibold py-1.5 px-4 rounded hover:bg-gray-100 transition">
          Logout
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-blue-700 font-semibold py-1.5 px-4 rounded hover:bg-gray-100 transition">
          Sign In
        </button>
      )}
    </header>
  );
}
