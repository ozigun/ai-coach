"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const goalOptions = [
  "Build muscle",
  "Lose fat",
  "Improve endurance",
  "Tone body",
  "Increase flexibility",
  "Maintain general fitness",
];

export default function SettingsPage() {
  const { userid } = useParams();
  const [form, setForm] = useState({
    height: "",
    weight: "",
    goal: "",
    level: "",
    weeklyWorkout: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userid}`);
      const data = await res.json();
      if (data.success) {
        const { height, weight, goal, level, weeklyWorkout } = data.user;
        setForm({ height, weight, goal, level, weeklyWorkout });
        console.log("User data loaded:", data.user);
      }
    };
    if (userid) fetchUser();
  }, [userid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${userid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        alert("User info updated!");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto mt-12 text-gray-900 font-sans">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Settings
      </h2>

      <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div>
          <label className="block font-semibold mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your height"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your weight"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Goal</label>
          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select a goal</option>
            {goalOptions.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Fitness Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Workouts per Week</label>
          <select
            name="weeklyWorkout"
            value={form.weeklyWorkout}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select frequency</option>
            <option value="1-2">1–2</option>
            <option value="3-4">3–4</option>
            <option value="5+">5+</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </section>
  );
}
