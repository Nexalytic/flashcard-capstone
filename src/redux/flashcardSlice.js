import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem("flashcards");
  return data ? JSON.parse(data) : [];
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: {
    flashcards: loadFromLocalStorage()
  },
  reducers: {

    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
      localStorage.setItem(
        "flashcards",
        JSON.stringify(state.flashcards)
      );
    },

    deleteFlashcard: (state, action) => {
      state.flashcards = state.flashcards.filter(
        (card) => card.id !== action.payload
      );
      localStorage.setItem(
        "flashcards",
        JSON.stringify(state.flashcards)
      );
    },

    // ✅ NEW: Update Flashcard (for editing terms)
    updateFlashcard: (state, action) => {
      const updatedFlashcard = action.payload;

      state.flashcards = state.flashcards.map((card) =>
        card.id === updatedFlashcard.id ? updatedFlashcard : card
      );

      localStorage.setItem(
        "flashcards",
        JSON.stringify(state.flashcards)
      );
    }

  }
});

export const {
  addFlashcard,
  deleteFlashcard,
  updateFlashcard   // 👈 Export new action
} = flashcardSlice.actions;

export default flashcardSlice.reducer;