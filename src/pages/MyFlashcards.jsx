import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFlashcard } from "../redux/flashcardSlice";
import { FaBookOpen } from "react-icons/fa";

export default function MyFlashcards() {
  const flashcards = useSelector((state) => state.flashcards);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flashcard?"
    );

    if (confirmDelete) {
      dispatch(deleteFlashcard(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto pt-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          My Flashcards
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Create, manage, and revise your flashcards easily. 
          Organize your knowledge and improve your learning experience.
        </p>

        <Link to="/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-300">
            + Create New Flashcard
          </button>
        </Link>
      </div>

      {/* FLASHCARDS SECTION */}
      <div className="max-w-6xl mx-auto mt-16 px-6 pb-16">

        {flashcards.length === 0 ? (

          /* EMPTY STATE */
          <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-xl mx-auto">
            <FaBookOpen className="text-5xl text-blue-500 mx-auto mb-6" />

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Flashcards Yet
            </h2>

            <p className="text-gray-600 mb-6">
              Start creating flashcards to organize your study materials 
              and boost your productivity.
            </p>

            <Link to="/create">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Create Your First Flashcard
              </button>
            </Link>
          </div>

        ) : (

          /* GRID LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flashcards.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {card.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link to={`/flashcard/${card.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(card.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}