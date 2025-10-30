import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { Settings, RotateCcw, Moon, Sun, Menu, X } from "lucide-react";

function AppContent() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from document or default to true
    return document.documentElement.classList.contains("dark");
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto w-full px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo and title */}
            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-green-500 flex-shrink-0">
                <span className="text-base sm:text-lg font-bold text-white">✓</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                  StudyTrace
                </h1>
                <p className="text-xs text-muted-foreground">
                  Track your progress
                </p>
              </div>
            </div>

            {/* Navigation tabs - hidden on mobile, shown on sm+ */}
            <nav className="hidden sm:flex gap-1 md:gap-2 flex-1 justify-center">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/schedule");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "schedule"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => {
                  navigate("/analysis");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "analysis"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Analysis
              </button>
            </nav>

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button className="hidden sm:flex px-3 md:px-4 py-2 rounded-lg bg-rose-500 text-white text-xs md:text-sm font-medium hover:bg-rose-600 transition-colors items-center gap-1 md:gap-2 whitespace-nowrap">
                <RotateCcw size={14} className="md:w-4 md:h-4" />
                <span className="hidden md:inline">Reset Data</span>
                <span className="md:hidden">Reset</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0">
                <Settings size={18} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t border-border space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === "dashboard"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/schedule");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === "schedule"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => {
                  navigate("/analysis");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === "analysis"
                    ? "bg-green-500 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Analysis
              </button>
              <button className="w-full px-4 py-3 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors flex items-center gap-2">
                <RotateCcw size={16} />
                Reset Data
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
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
