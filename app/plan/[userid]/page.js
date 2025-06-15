"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaClock, FaDumbbell, FaRobot } from "react-icons/fa";

export default function UserPlanPage() {
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userid}`);
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
      }
    };
    if (userid) fetchUser();
  }, [userid]);

  const handleGenerate = async () => {
    if (!duration || !equipment || !userData)
      return alert("Please select both options");

    const prompt = `Create a ${duration}-minute workout plan for a ${userData.level} ${userData.gender} who is ${userData.height} cm tall and ${userData.weight} kg. Their goal is ${userData.goal}. They work out ${userData.weeklyWorkout} per week. Equipment available: ${equipment}. Format with exercise names and durations.`;

    setLoading(true);
    setResult("");
    setSaved(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || "No response.");
    } catch (err) {
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkout = async () => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userid,
          date: new Date().toISOString().split("T")[0],
          workoutText: result,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Workout saved to progress!");
        setSaved(true);
      } else {
        alert("Save failed.");
      }
    } catch (err) {
      alert("Error saving workout.");
    }
  };

  if (!userData) {
    return (
      <div className="text-center text-red-600 font-semibold mt-20 animate-pulse">
        Loading user data...
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-12 px-6 text-gray-900 font-sans">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-md">
        Welcome Back,{" "}
        <span className="underline decoration-pink-500">{userData.email}</span>
      </h2>

      <div className="grid gap-10 md:grid-cols-2 mb-12">
        {/* Duration Selector */}
        <div className="text-center">
          <h3 className="flex justify-center items-center gap-2 font-semibold mb-6 text-lg tracking-wide text-gray-700">
            <FaClock className="text-blue-600" /> Today&apos;s Workout Duration
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["15", "30", "45", "60"].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className={`min-w-[90px] text-sm sm:text-base px-5 py-3 rounded-xl border-2 font-medium transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  duration === min
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}>
                {min} min
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Selector */}
        <div className="text-center">
          <h3 className="flex justify-center items-center gap-2 font-semibold mb-6 text-lg tracking-wide text-gray-700">
            <FaDumbbell className="text-blue-600" /> Available Equipment
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Bodyweight", "Dumbbells", "Bands", "Barbell"].map((eq) => (
              <button
                key={eq}
                onClick={() => setEquipment(eq)}
                className={`min-w-[110px] text-sm sm:text-base px-5 py-3 rounded-xl border-2 font-medium transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  equipment === eq
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}>
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full sm:w-auto px-10 bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Generating your plan..." : "Generate Workout Plan"}
        </button>
      </div>

      {result && (
        <div className="mt-10 text-gray-900 leading-relaxed whitespace-pre-line">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <FaRobot /> Your AI Workout Plan
          </h3>
          <p className="text-base sm:text-lg mb-4">{result}</p>

          <button
            onClick={handleSaveWorkout}
            disabled={saved}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50">
            {saved ? "Saved to Progress ✅" : "Mark as Done"}
          </button>
        </div>
      )}
    </section>
  );
}
