
# 🌍 North East Adventure Tour Planner - Frontend

Welcome to the **North East Adventure Tour Planner** frontend application! Built with **React** and **TypeScript**, this application provides a modern and responsive user interface for browsing and booking adventure tours in the North East region.

## 🚀 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM v7**
- **Axios** for API communication
- **React Icons**
- **Tailwind CSS**
- **PostCSS**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

Follow these steps to set up the frontend:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/USERNAME/REPOSITORY_NAME.git
   ```
2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a `.env` file** in the root directory with the following variable:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready static assets
- `npm run preview` - Preview the production build locally

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React context providers
│   ├── assets/            # Static assets (images, etc.)
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Application entry point
├── public/                # Public static files
├── types.ts               # TypeScript type definitions
├── constants.ts           # Application constants
├── apiService.ts          # API service functions
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 🌟 Features

### User Features
- User registration and authentication
- Browse and filter tour packages
- View detailed package information
- Add packages to wishlist
- Book tour packages
- View booking history
- Cancel pending bookings
- Submit reviews and ratings

### Admin Features
- Admin dashboard
- Manage bookings
- Update booking statuses
- View all user bookings

## 🔗 API Integration

The frontend communicates with the backend through RESTful APIs. Key endpoints include:

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/profile` - Get user profile

### Tours
- **GET** `/api/tours` - Get all tours
- **GET** `/api/tours/:id` - Get tour details

### Bookings
- **POST** `/api/bookings` - Create booking
- **GET** `/api/bookings` - Get user bookings
- **PUT** `/api/bookings/:id` - Update booking

## 🛠️ Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Follow the established project structure

### State Management
- Use React Context for global state
- Implement proper loading states
- Handle API errors gracefully

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent color scheme and typography

## 🤝 Contributing

We welcome contributions! Here’s how you can help:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📜 License

This project is licensed under the **MIT License**.

---
