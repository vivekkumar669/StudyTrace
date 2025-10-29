import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { Settings, RotateCcw, Moon, Sun } from "lucide-react";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo and title */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                  <span className="text-lg font-bold text-white">✓</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    StudyTrace
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Track your progress
                  </p>
                </div>
              </div>

              {/* Navigation tabs */}
              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-green-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("schedule")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "schedule"
                      ? "bg-green-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Schedule
                </button>
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "analysis"
                      ? "bg-green-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Analysis
                </button>
              </nav>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors flex items-center gap-2">
                  <RotateCcw size={16} />
                  Reset Data
                </button>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Settings size={20} />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={<Dashboard setActiveTab={() => setActiveTab("dashboard")} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard setActiveTab={() => setActiveTab("dashboard")} />}
            />
            <Route
              path="/schedule"
              element={<Schedule setActiveTab={() => setActiveTab("schedule")} />}
            />
            <Route
              path="/analysis"
              element={<Analysis setActiveTab={() => setActiveTab("analysis")} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
