"use client";

import "./globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en" className="h-full">
      <head>
        <title>AI Workout Plan Generator</title>
        <meta
          name="description"
          content="Create custom workout plans powered by AI"
        />
      </head>
      <body className="h-full bg-gray-50 text-gray-800 font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Workout Plan Generator</h1>
            <button
              onClick={() => router.push("/login")} // ileride yönlendirme eklenebilir
              className="bg-white text-blue-700 font-semibold py-1.5 px-4 rounded hover:bg-gray-100 transition">
              Sign In
            </button>
          </header>

          <main className="flex-1  mx-auto w-full p-6">{children}</main>

          <footer className="bg-blue-700 text-white p-4 text-center">
            &copy; 2025 AI Workout Platform
          </footer>
        </div>
      </body>
    </html>
  );
}
