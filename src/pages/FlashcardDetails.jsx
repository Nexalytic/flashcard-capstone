import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { updateFlashcard } from "../redux/flashcardSlice";
import {
  FaEdit,
  FaShareAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPrint,
  FaWhatsapp
} from "react-icons/fa";

export default function FlashcardDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.flashcards);

  const flashcard = flashcards.find(
    (card) => card.id.toString() === id
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTerm, setEditedTerm] = useState("");

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isCarousel, setIsCarousel] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handlePrint = () => {
    window.print();
  };

  if (!flashcard) {
    return (
      <div className="max-w-5xl mx-auto mt-14 px-5">
        <h2 className="text-2xl font-semibold mb-4">
          Flashcard not found
        </h2>
        <Link to="/">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const selectedTerm =
    flashcard.terms && flashcard.terms.length > 0
      ? flashcard.terms[selectedIndex]
      : null;

  const handleEditClick = () => {
    setEditedTerm(selectedTerm.term);
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTerms = flashcard.terms.map((term, index) =>
      index === selectedIndex
        ? { ...term, term: editedTerm }
        : term
    );

    dispatch(
      updateFlashcard({
        ...flashcard,
        terms: updatedTerms
      })
    );

    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${url}`;
    window.open(whatsappUrl, "_blank");
  };

  const goNext = () => {
    if (selectedIndex < flashcard.terms.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goPrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-14 px-5 print:bg-white">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-10 print:shadow-none print:p-0">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {flashcard.title}
            </h1>
            <p className="text-gray-500 mt-2">
              {flashcard.description}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCarousel(!isCarousel)}
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              {isCarousel ? "List View" : "Carousel View"}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FaPrint />
              Print
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FaShareAlt />
              Share
            </button>
          </div>
        </div>

        {flashcard.image && (
          <div className="mb-8">
            <img
              src={flashcard.image}
              alt={flashcard.title}
              className="w-full max-w-lg rounded-xl shadow-md"
            />
          </div>
        )}

        {/* LIST MODE */}
        {!isCarousel && (
          <div className="flex gap-10 mt-8">
            <div className="w-1/3 bg-slate-50 p-6 rounded-xl shadow-sm print:hidden">
              <h3 className="text-lg font-semibold mb-4">
                Terms
              </h3>

              {flashcard.terms.map((term, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`cursor-pointer border rounded-lg px-4 py-3 mb-3 transition font-medium
                    ${
                      selectedIndex === index
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "hover:bg-white"
                    }`}
                >
                  {term.term}
                </div>
              ))}
            </div>

            <div className="w-2/3 bg-white shadow-md rounded-xl p-8 print:w-full">
              <TermContent
                selectedTerm={selectedTerm}
                isEditing={isEditing}
                editedTerm={editedTerm}
                setEditedTerm={setEditedTerm}
                handleEditClick={handleEditClick}
                handleSave={handleSave}
                inputRef={inputRef}
              />
            </div>
          </div>
        )}

        {/* CAROUSEL MODE */}
        {isCarousel && (
          <div className="mt-10 relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${selectedIndex * 100}%)`
              }}
            >
              {flashcard.terms.map((term, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
                    <h3 className="text-3xl font-bold mb-4">
                      {term.term}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {term.definition}
                    </p>

                    {term.image && (
                      <img
                        src={term.image}
                        alt={term.term}
                        className="mx-auto max-w-sm rounded-xl shadow-md"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8 print:hidden">
              <button
                onClick={goPrev}
                disabled={selectedIndex === 0}
                className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-40"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={goNext}
                disabled={
                  selectedIndex === flashcard.terms.length - 1
                }
                className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-40"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 print:hidden">
          <Link to="/">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition">
              Back to My Flashcards
            </button>
          </Link>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 print:hidden">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">

            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Share Flashcard
            </h2>

            <input
              type="text"
              value={window.location.href}
              readOnly
              className="w-full border px-3 py-2 rounded-lg mb-4"
            />

            <button
              onClick={handleCopy}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              <FaWhatsapp />
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* TermContent unchanged */
function TermContent({
  selectedTerm,
  isEditing,
  editedTerm,
  setEditedTerm,
  handleEditClick,
  handleSave,
  inputRef
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editedTerm}
            onChange={(e) => setEditedTerm(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full mr-3"
          />
        ) : (
          <h3 className="text-2xl font-bold">
            {selectedTerm?.term}
          </h3>
        )}

        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <FaEdit />
          </button>
        )}
      </div>

      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-1 rounded-lg mb-4"
        >
          Save
        </button>
      )}

      <p className="text-gray-700 mb-6">
        {selectedTerm?.definition}
      </p>

      {selectedTerm?.image && (
        <img
          src={selectedTerm.image}
          alt={selectedTerm.term}
          className="w-full max-w-sm rounded-xl border"
        />
      )}
    </>
  );
}