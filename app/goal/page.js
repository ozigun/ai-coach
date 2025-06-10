"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const goals = [
  "Build muscle",
  "Lose fat",
  "Improve endurance",
  "Tone body",
  "Increase flexibility",
  "Maintain general fitness",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function GoalPage() {
  const router = useRouter();

  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weeklyWorkout, setWeeklyWorkout] = useState("");
  const [level, setLevel] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const g = localStorage.getItem("gender");
    const h = localStorage.getItem("height");
    const w = localStorage.getItem("weight");

    if (!g || !h || !w) {
      router.push("/");
    } else {
      setGender(g);
      setHeight(h);
      setWeight(w);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalGoal = customGoal.trim() || selectedGoal;
    if (!finalGoal || !weeklyWorkout || !level)
      return alert("Please complete all fields.");

    setShowModal(true);
  };

  const handleSaveToMongo = async () => {
    const finalGoal = customGoal.trim() || selectedGoal;

    const payload = {
      email,
      password,
      gender,
      height,
      weight,
      weeklyWorkout,
      level,
      goal: finalGoal,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/save-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.userId) {
        alert("Saved successfully!");
        setShowModal(false);
        router.push(`/plan/${data.userId}`);
      } else {
        alert("Save failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-2xl bg-white p-10 rounded-lg shadow-lg border border-gray-200 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          What&apos;s your fitness goal?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map((goal, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedGoal(goal)}
                className={`border px-4 py-3 rounded-lg text-sm font-medium ${
                  selectedGoal === goal
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}>
                {goal}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Or enter your own goal:
            </label>
            <input
              type="text"
              placeholder="e.g. Run a half-marathon"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              How many days per week do you work out?
            </label>
            <select
              value={weeklyWorkout}
              onChange={(e) => setWeeklyWorkout(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required>
              <option value="">Select frequency</option>
              <option value="1-2">1-2 days</option>
              <option value="3-4">3-4 days</option>
              <option value="5+">5 or more days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              What is your fitness level?
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required>
              {" "}
              <option value="">Select level</option>
              {levels.map((lvl, i) => (
                <option key={i} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">
            Continue
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-gray-800">
            <h3 className="text-lg font-bold mb-4">Create an Account</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mb-3 rounded text-gray-800"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mb-4 rounded text-gray-800"
            />
            <button
              onClick={handleSaveToMongo}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
