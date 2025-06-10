"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  const handleGenderSelect = (gender) => {
    localStorage.setItem("gender", gender);
    router.push("/userinfo");
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "brightness(0.85)",
      }}>
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-lg shadow-xl w-full text-center max-w-3xl">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Build Your Custom Workout Plan with AI
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Select your gender to personalize your workout plan.
        </p>

        {/* 👤 Gender Selection Cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
          <button
            onClick={() => handleGenderSelect("male")}
            className="flex flex-col items-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-4 px-6 rounded-xl shadow-md transition w-40">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              alt="Male Icon"
              className="w-16 h-16 mb-2"
            />
            Male
          </button>

          <button
            onClick={() => handleGenderSelect("female")}
            className="flex flex-col items-center bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold py-4 px-6 rounded-xl shadow-md transition w-40">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              alt="Female Icon"
              className="w-16 h-16 mb-2"
            />
            Female
          </button>
        </div>
      </div>
    </section>
  );
}
