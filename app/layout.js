import "./globals.css";
import Header from "./components/Header";
export const metadata = {
  title: "AI Workout Plan Generator",
  description: "Create custom workout plans powered by AI",
  other: {
    "google-adsense-account": "ca-pub-9638855853940707",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>AI Workout Plan Generator</title>
        <meta
          name="description"
          content="Create custom workout plans powered by AI"
        />
        <meta name="google-adsense-account" content="ca-pub-9638855853940707" />
      </head>
      <body className="h-full bg-gray-50 text-gray-800 font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 mx-auto w-full ">{children}</main>
          <footer className="bg-blue-700 text-white p-4 text-center">
            &copy; 2025 AI Workout Platform
          </footer>
        </div>
      </body>
    </html>
  );
}
