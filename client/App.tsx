import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { Settings, RotateCcw, Moon, Sun } from "lucide-react";

function AppContent() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from document or default to true
    return document.documentElement.classList.contains("dark");
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure dark class is applied on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDark(true);
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/schedule") return "schedule";
    if (path === "/analysis") return "analysis";
    return "dashboard";
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
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
                onClick={() => navigate("/")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/schedule")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "schedule"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => navigate("/analysis")}
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
