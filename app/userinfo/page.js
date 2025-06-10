"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInfoPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedGender = localStorage.getItem("gender");
    if (!savedGender) {
      router.push("/"); // doğrudan gelirse geri gönder
    } else {
      setGender(savedGender);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!height || !weight) return alert("Please fill in all fields.");
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    router.push(`/goal`);
  };

  return (
    <section className="max-w-md mx-auto mt-20 bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Tell us about yourself
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
        <div>
          <label className="block font-semibold mb-1">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">
          Continue
        </button>
      </form>
    </section>
  );
}
