# Blog App

A full-stack blogging platform built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend. This project allows users to create, edit, and share blog posts, comment, manage profiles, and more, with a modern UI and robust admin features.

---

## Table of Contents

* [Introduction](#introduction)
* [Live Demo](#live-demo)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Project Structure](#project-structure)
* [Frontend](#frontend)
* [Backend](#backend)
* [Setup & Installation](#setup--installation)
* [Environment Variables](#environment-variables)
* [Usage](#usage)
* [Contributing](#contributing)

---

## Introduction

**Blog App** is a feature-rich blogging platform for developers and writers. Users can sign up, create posts with rich text and images, comment, and manage their profiles. Admins have access to dashboards for user and post management. The project demonstrates modern web development practices, including authentication, REST APIs, cloud image uploads, and responsive design.

---

## Live Demo

> [Live URL](https://blogging-1-amnr.onrender.com/)

---

## Tech Stack

**Frontend:**

* React 19 + Vite
* Flowbite React (UI components)
* Tailwind CSS
* Redux Toolkit & Redux Persist
* React Router DOM
* Firebase (Google OAuth)
* React Icons

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cloudinary (Image uploads)
* Multer (File handling)
* bcrypt (Password hashing)
* Express Validator

---

## Features

* **Authentication:** Sign up, sign in, Google OAuth, JWT-based sessions.
* **Profile Management:** Update profile, change password, upload avatar, delete account.
* **Blog Posts:** Create, edit, delete, update posts with images and rich text.
* **AI Blog Generation:** Generate blog content using Gemini AI.
* **Comments:** Add, edit, delete, like comments on posts.
* **Admin Dashboard:** Manage users, posts, comments, view analytics.
* **Search & Filter:** Search posts by title/content/category.
* **Responsive Design:** Mobile-friendly, modern UI.
* **Cloud Image Uploads:** Store images securely via Cloudinary.
* **Security:** Password hashing, protected routes, CORS, secure cookies.

---

## Project Structure

```
backend/
  ├── src/
  │   ├── config/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── models/
  │   ├── routes/
  │   └── utils/
  ├── .env
  └── package.json

frontend/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── index.css
  ├── .env
  ├── index.html
  └── package.json
```

---

## Frontend

* **Entry Point:** `src/main.jsx`
* **Routing:** `src/App.jsx`
* **Pages:** Home, About, Projects, Dashboard, Create/Update Post, Sign In/Up, Post Details, Search.
* **Components:** Header, Footer, BlogEditor, DashBoardComp, DashPosts, DashUsers, Profile, CommentSection, etc.
* **Styling:** Tailwind CSS, Flowbite React.
* **State Management:** Redux Toolkit, Redux Persist.
* **OAuth:** Firebase Google Auth.

---

## Backend

* **Entry Point:** `src/index.js`
* **API Routing:** `src/routes/api.router.js`
* **Controllers:** Auth, User, Post, Comment.
* **Models:** User, Post, Comment (Mongoose schemas).
* **Middlewares:** Authentication, Validation, Error handling.
* **Image Uploads:** Multer (memory storage), Cloudinary integration.
* **Security:** JWT, bcrypt, CORS, cookie-parser.

---

## Setup & Installation

### Prerequisites

* Node.js & npm
* MongoDB (local or Atlas)
* Cloudinary account (for image uploads)
* Firebase project (for Google OAuth)

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/blog-app.git
cd blog-app
```

### 2. Backend Setup

```sh
cd backend
npm install
# Create .env file (see below)
npm run dev
```

### 3. Frontend Setup

```sh
cd frontend
npm install
# Create .env file (see below)
npm run dev
```

---

## Environment Variables

### Backend `.env`

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Frontend `.env`

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SERVER_URL=http://localhost:8000
```

---

## Usage

* **Sign Up / Sign In:** Register or log in with email/password or Google.
* **Admin Access:**
  To access the Admin Dashboard, use the following credentials:
  **Email:** `admin@a.com`
  **Password:** `123456`
* **Create Post:** Admins can create posts with title, category, content, and image.
* **AI Generation:** Use Gemini AI to auto-generate blog content.
* **Edit Profile:** Update username, email, password, and profile picture.
* **Comment:** Add, edit, delete, and like comments on posts.
* **Dashboard:** Admins can manage users, posts, and comments.
* **Search:** Filter posts by category or search term.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

