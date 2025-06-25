import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9638855853940707"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
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
