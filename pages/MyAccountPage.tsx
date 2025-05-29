import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const UserCircleLargeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
);


const MyAccountPage: React.FC = () => {
  const { currentUser, logoutUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/'); 
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Loading account details..." size="lg"/></div>;
  }

  if (!currentUser) {
    navigate('/login', { replace: true });
    return null; 
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-10 border-t-4 border-primary">
      <div className="text-center mb-10">
        <UserCircleLargeIcon className="w-28 h-28 text-primary mx-auto" />
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mt-4">My Account</h1>
        <p className="text-text-light text-lg">Welcome back, <span className="font-semibold text-secondary">{currentUser.name}!</span></p>
      </div>

      <div className="space-y-5 mb-10">
        <div className="p-4 bg-neutral-lightest rounded-lg border border-neutral-light/70 shadow-sm">
          <p className="text-xs font-medium text-text-dark uppercase tracking-wider">Full Name</p>
          <p className="text-text text-lg">{currentUser.name}</p>
        </div>
        <div className="p-4 bg-neutral-lightest rounded-lg border border-neutral-light/70 shadow-sm">
          <p className="text-xs font-medium text-text-dark uppercase tracking-wider">Email Address</p>
          <p className="text-text text-lg">{currentUser.email}</p>
        </div>
        <div className="p-4 bg-neutral-lightest rounded-lg border border-neutral-light/70 shadow-sm">
          <p className="text-xs font-medium text-text-dark uppercase tracking-wider">Account Created</p>
          <p className="text-text text-lg">{new Date(currentUser.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <Link 
            to="/my-bookings" 
            className="flex items-center justify-center text-center bg-primary hover:bg-secondary text-white font-semibold py-3.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2"
        >
            <BookOpenIcon className="w-5 h-5 mr-2.5"/> My Bookings
        </Link>
        <Link 
            to="/wishlist" 
            className="flex items-center justify-center text-center bg-accent hover:bg-accent-dark text-primary font-semibold py-3.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
        >
           <HeartIcon className="w-5 h-5 mr-2.5"/> My Wishlist
        </Link>
      </div>
      
      <p className="text-sm text-text-light text-center mb-8 italic">
        This is a demo account page. In a real application, you might find options to edit your profile or change your password here.
      </p>

      <div className="text-center border-t border-neutral-light pt-8">
        <button
          onClick={handleLogout}
          className="bg-error hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-error/50 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyAccountPage;