"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import { useParams } from "next/navigation";

// Dinamik import — hydration hatasını önler
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function ProgressPage() {
  const { userid } = useParams();
  const [value, setValue] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?userId=${userid}`);
      const data = await res.json();
      if (data.success) {
        setWorkouts(data.progress);
      }
    };
    if (userid) fetchProgress();
  }, [userid]);

  const handleDayClick = (date) => {
    const isoDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const workout = workouts.find(
      (w) => new Date(w.date).toLocaleDateString("en-CA") === isoDate
    );
    setSelectedWorkout(workout || null);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 text-gray-800">
      <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
        Progress Tracker
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Takvim */}
        <div className="bg-white p-4 rounded-2xl shadow-md w-full md:w-[360px]">
          <Calendar
            onChange={setValue}
            value={value}
            onClickDay={handleDayClick}
            tileClassName={({ date }) => {
              const iso = date.toLocaleDateString("en-CA");
              const workoutDates = workouts.map((w) =>
                new Date(w.date).toLocaleDateString("en-CA")
              );
              return workoutDates.includes(iso)
                ? "bg-green-200 rounded-full"
                : "";
            }}
          />
        </div>

        {/* Seçilen Günün Antrenmanı */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md min-h-[250px]">
          {selectedWorkout ? (
            <>
              <h3 className="text-2xl font-bold text-blue-600 mb-3">
                Workout on{" "}
                {new Date(selectedWorkout.date).toLocaleDateString("en-GB")}
              </h3>
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {selectedWorkout.workoutText}
              </pre>
            </>
          ) : (
            <p className="text-gray-600 text-lg italic">
              Select a date to see your workout.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
