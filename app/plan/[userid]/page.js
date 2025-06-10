"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserPlanPage() {
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

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

  if (!userData) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Loading user data...
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10 px-6 text-gray-800">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Welcome Back, {userData.email}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Today&apos;s Workout Duration</h3>
          <div className="flex gap-2 flex-wrap">
            {["15", "30", "45", "60"].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className={`px-4 py-2 rounded border ${
                  duration === min
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}>
                {min} min
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Available Equipment</h3>
          <div className="flex gap-2 flex-wrap">
            {["Bodyweight", "Dumbbells", "Bands", "Barbell"].map((eq) => (
              <button
                key={eq}
                onClick={() => setEquipment(eq)}
                className={`px-4 py-2 rounded border ${
                  equipment === eq
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}>
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">
        {loading ? "Generating..." : "Generate Workout Plan"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow whitespace-pre-line border border-gray-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Your AI Workout Plan
          </h3>
          <p className="text-gray-800">{result}</p>
        </div>
      )}
    </section>
  );
}
