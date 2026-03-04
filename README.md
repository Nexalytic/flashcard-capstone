# Flashcard Generator

A modern React-based flashcard creation and study application that allows users to create, organize, and review flashcards efficiently.
This project demonstrates modern frontend development practices using **React, Redux, React Router, and Tailwind CSS**.

---

## Live Demo

**Live Website:**
https://flashcard-capstone.netlify.app/

**GitHub Repository:**
https://github.com/Nexalytic/flashcard-capstone

---

## Project Overview

The Flashcard Generator is a web application designed to help users create and manage flashcards for studying and learning purposes.

Users can create flashcards with multiple terms, definitions, and images, and review them using an intuitive interface including **list view and carousel view**.

The application stores flashcards using **Redux state and browser local storage**, allowing data persistence within the user's browser session.

---

## Features

* Create flashcards with title and description
* Add multiple terms and definitions
* Support for images in flashcards
* View flashcards in organized list format
* Carousel mode for studying flashcards
* Edit flashcard terms
* Print flashcards
* Share flashcards using link or WhatsApp
* Persistent storage using local storage
* Responsive UI with modern design

---

## Tech Stack

**Frontend**

* React
* React Router
* Redux Toolkit
* Tailwind CSS

**Build Tool**

* Vite

**Deployment**

* Netlify

**Version Control**

* Git & GitHub

---

## Project Structure

```
flashcard-capstone
│
├── public
│   ├── _redirects
│   └── vite.svg
│
├── src
│   ├── assets
│   │   └── react.svg
│   │
│   ├── components
│   │
│   ├── pages
│   │   ├── CreateFlashcard.jsx
│   │   ├── FlashcardDetails.jsx
│   │   └── MyFlashcards.jsx
│   │
│   ├── redux
│   │   ├── flashcardSlice.js
│   │   └── store.js
│   │
│   ├── utils
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## How It Works

1. Users create flashcards using the **Create Flashcard page**.
2. Each flashcard can contain multiple terms and definitions.
3. Flashcards are stored in **Redux state and local storage**.
4. Users can view flashcards on the **My Flashcards page**.
5. Clicking a flashcard opens the **Flashcard Details page**.
6. Users can review flashcards in **List View or Carousel View**.
7. Flashcards can be **shared or printed** for learning purposes.

---

## Installation (Run Locally)

Clone the repository:

```
git clone https://github.com/Nexalytic/flashcard-capstone.git
```

Navigate into the project directory:

```
cd flashcard-capstone
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

The project will run at:

```
http://localhost:5173
```

---

## Deployment

The project is deployed using **Netlify**.

Build command:

```
npm run build
```

Publish directory:

```
dist
```

React Router redirect rule is configured using:

```
public/_redirects
```

---

## Future Improvements

* Backend database integration
* User authentication
* Cloud storage for flashcards
* Flashcard categories
* Study progress tracking

---

## Author

Deepak Raj

GitHub:
https://github.com/Nexalytic

---

## License

This project is created for educational purposes as part of a capstone project.

