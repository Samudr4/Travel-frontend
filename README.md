# Travel Booking Platform

A full-stack web application for browsing, booking, and managing travel packages. This platform features separate user and admin roles, JWT-based authentication, and a RESTful API backend.

## Features

*   **User Features:**
    *   User registration and login
    *   Browse and filter tour packages
    *   View detailed package information including descriptions, activities, inclusions, and user reviews
    *   Add packages to a personal wishlist
    *   Book tour packages
    *   View personal booking history
    *   Cancel pending bookings
    *   Submit reviews and ratings for packages
*   **Admin Features:**
    *   Admin login with dedicated access
    *   View all user bookings
    *   Update booking statuses (e.g., confirm, cancel)
    *   (Future enhancements could include package management, user management, etc.)

## Technology Stack

*   **Frontend:**
    *   React 18
    *   Vite
    *   TypeScript
    *   React Router DOM v6
    *   Axios (for API communication)
    *   React Query (for server state management)
    *   Tailwind CSS (for styling)
    *   Context API (for global state like auth and wishlist)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (with Mongoose ODM)
    *   JSON Web Tokens (JWT) for authentication
    *   Bcrypt.js (for password hashing)

## Screenshots

(Here you can add a preview of your application)

![Application Preview 1](frontend/assets/Screenshot.png)

## Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (v9.x or later) or yarn
*   MongoDB (local instance or a cloud-hosted service like MongoDB Atlas)

## API Endpoints (Key Examples)

The backend exposes a RESTful API. Key endpoints include:

*   **Authentication:**
    *   `POST /api/auth/register`: Register a new user.
    *   `POST /api/auth/login`: Log in an existing user.
    *   `GET /api/auth/me`: Get the currently authenticated user's details.
*   **Tours/Packages:**
    *   `GET /api/tours`: Get a list of all tour packages.
    *   `GET /api/tours/:id`: Get details for a specific tour package.
*   **Bookings (User):**
    *   `POST /api/bookings`: Create a new booking.
    *   `GET /api/bookings/my-bookings`: Get bookings for the authenticated user.
    *   `PATCH /api/bookings/:id/cancel`: Cancel a booking (by the user who made it).
*   **Bookings (Admin):**
    *   `GET /api/bookings/admin/all`: Get all bookings (admin only).
    *   `PATCH /api/bookings/admin/:id/status`: Update the status of a booking (admin only).
*   **Reviews:**
    *   `POST /api/reviews`: Submit a review for a package.
    *   `GET /api/reviews/package/:packageId`: Get reviews for a specific package (implicitly handled by tour detail endpoint).

## Available Scripts

### Backend (`backend/package.json`)

*   `start`: Runs the production server (e.g., `node src/server.js`).
*   `dev`: Runs the server in development mode using `nodemon` for auto-restarts (e.g., `nodemon src/server.js`).
*   (Other scripts like `test`, `lint` may be present or can be added).

### Frontend (`frontend/package.json`)

*   `dev`: Starts the Vite development server.
*   `build`: Builds the production-ready static assets.
*   `lint`: Lints the codebase (e.g., using ESLint).
*   `preview`: Serves the production build locally.

## License

This project can be considered under the MIT License. (You may want to add a `LICENSE` file explicitly if desired). 