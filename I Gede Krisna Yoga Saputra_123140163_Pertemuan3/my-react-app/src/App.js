import React, { useState } from "react";
import { Book } from "lucide-react";
import { BookProvider } from "./context/BookContext";
import { HomePage } from "./pages/Home/HomePage";
import { StatsPage } from "./pages/Stats/StatsPage";
import "./index.css"; // pastikan tailwind aktif

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Book className="text-blue-600" size={28} />
                <span className="text-xl font-bold text-gray-800">MyBooks</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage("home")}
                  className={`px-4 py-2 rounded-lg ${currentPage === "home"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Koleksi
                </button>
                <button
                  onClick={() => setCurrentPage("stats")}
                  className={`px-4 py-2 rounded-lg ${currentPage === "stats"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Statistik
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPage === "home" ? <HomePage /> : <StatsPage />}
        </main>
      </div>
    </BookProvider>
  );
};

export default App;
