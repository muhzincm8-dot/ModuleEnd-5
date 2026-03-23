Live frontend hosted link : https://module-end-5-dihu.vercel.app/

backend hosted link : https://module-end-5-bay.vercel.app/



*********** DOCUMENTATION ************

# MERN Task Manager

A full-stack, personal task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project provides a complete authentication flow and CRUD (Create, Read, Update, Delete) functionality for managing individual user tasks.

## Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Task Management**: Authenticated users can create, view, update (complete/incomplete), and delete their own tasks.
- **Data Isolation**: Tasks are linked to specific users via MongoDB ObjectIDs, ensuring users only see their own data.
- **Responsive UI**: A dark-themed, premium interface built with React and Tailwind CSS.
- **RESTful API**: A robust Express.js backend handling secure data transfers.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js installed on your machine.
- A MongoDB database (either local or MongoDB Atlas).

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `frontend` directory with the matching backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Deployment (Vercel)

This project is configured for easy deployment on Vercel.

1. **Push your code to GitHub**, including both the `frontend` and `backend` folders.
2. **Deploy the Backend**:
   - Create a new project in Vercel.
   - Set the Root Directory to `backend`.
   - Add your `MONGODB_URI` and `JWT_SECRET` environment variables.
   - Deploy. (Vercel will automatically use the provided `vercel.json` config).
3. **Deploy the Frontend**:
   - Create another new project in Vercel using the same repository.
   - Set the Root Directory to `frontend`.
   - Add the `VITE_API_URL` environment variable, setting it to the **live backend URL** (e.g., `https://your-backend-url.vercel.app/api`).
   - Deploy.
