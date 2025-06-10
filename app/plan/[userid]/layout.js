// app/plan/[userid]/layout.js

export default function UserDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block hover:underline">
            Workout Plan
          </a>
          <a href="#" className="block hover:underline">
            Progress
          </a>
          <a href="#" className="block hover:underline">
            Nutrition
          </a>
          <a href="#" className="block hover:underline">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
