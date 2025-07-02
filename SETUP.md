# Project Initialization Guide

This document explains how to initialize and run the **backend** and **frontend** projects in this repository.

## Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)
- MongoDB (local instance or MongoDB Atlas account)

---

## Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```bash
   # .env
   MONGO_URI=<your MongoDB connection string>
   PORT=5000
   ```
   > **Note:** Next.js uses port 3000 by default. To avoid port conflicts, set the backend `PORT` to a different value (e.g., `5000`).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The backend API will be available at `http://localhost:<PORT>/api`.

---

## Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser to view the frontend.

---

## Production Build

- **Backend** (in `backend` directory):
  ```bash
  npm start
  ```
- **Frontend** (in `frontend` directory):
  ```bash
  npm run build
  npm run start
  ```
