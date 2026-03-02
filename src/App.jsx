import { Routes, Route, Link, useLocation } from "react-router-dom";
import CreateFlashcard from "./pages/CreateFlashcard";
import MyFlashcards from "./pages/MyFlashcards";
import FlashcardDetails from "./pages/FlashcardDetails";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">

      {/* 🔹 Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* App Logo / Title */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Flashcard Generator
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition ${
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              My Flashcards
            </Link>

            <Link
              to="/create"
              className={`transition ${
                location.pathname === "/create"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Create
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔹 Page Content */}
      <div>
        <Routes>
          <Route path="/" element={<MyFlashcards />} />
          <Route path="/create" element={<CreateFlashcard />} />
          <Route path="/flashcard/:id" element={<FlashcardDetails />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;