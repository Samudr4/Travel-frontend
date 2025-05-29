import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import WishlistPage from './pages/WishlistPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPackages from './pages/admin/AdminPackages';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import MyAccountPage from './pages/MyAccountPage';
import MyBookingsPage from './pages/MyBookingsPage';
import TravelGuidePage from './pages/TravelGuidePage';
import TravelGuidePostPage from './pages/TravelGuidePostPage';
import LoadingSpinner from './components/LoadingSpinner';
import AdminReviews from './pages/admin/AdminReviews';

import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();

  const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
    const { currentUser: userForProtection, loading: authLoading } = useAuth();
    
    if (authLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <LoadingSpinner message="Verifying access..." size="lg" />
            </div>
        );
    }
    if (!userForProtection) {
      // Preserve the intended redirect path if trying to access a protected route
      const currentPath = window.location.hash.substring(1) || '/';
      return <Navigate to={`/login?redirect=${encodeURIComponent(currentPath)}`} replace />;
    }
    if (adminOnly && (!userForProtection || userForProtection.role !== 'admin')) {
      return <Navigate to="/" replace />; // Or an unauthorized page
    }
    return <>{children}</>;
  };
  
  const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAdmin: userIsAdmin, loading: authLoading, currentUser: userForAdminCheck } = useAuth();
    
    if (authLoading) {
        return (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <LoadingSpinner message="Loading authentication..." size="lg" />
          </div>
        );
    }

    if (!userIsAdmin || !userForAdminCheck || userForAdminCheck.role !== 'admin') { 
      // Added check for currentUser explicitly for admin role for extra safety
      return <Navigate to="/admin/login" replace />;
    }
    return <>{children}</>;
  };


  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-neutral-lightest">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/travel-guide" element={<TravelGuidePage />} />
            <Route path="/travel-guide/:postId" element={<TravelGuidePostPage />} />
            
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/register" element={<UserRegisterPage />} />

            <Route 
              path="/wishlist" 
              element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} 
            />
            <Route 
              path="/booking/:packageId" 
              element={<ProtectedRoute><BookingPage /></ProtectedRoute>} 
            />
            <Route 
              path="/my-account" 
              element={<ProtectedRoute><MyAccountPage /></ProtectedRoute>} 
            />
            <Route 
              path="/my-bookings" 
              element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} 
            />
            
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin/dashboard" 
              element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} 
            />
            <Route 
              path="/admin/packages" 
              element={<AdminProtectedRoute><AdminPackages /></AdminProtectedRoute>} 
            />
             <Route 
              path="/admin/bookings" 
              element={<AdminProtectedRoute><AdminBookings /></AdminProtectedRoute>} 
            />
             <Route 
              path="/admin/users" 
              element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} 
            />
            <Route 
              path="/admin/reviews" 
              element={<AdminProtectedRoute><AdminReviews /></AdminProtectedRoute>} 
            />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Basic 404 redirect */}
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;