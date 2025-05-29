import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Booking } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUserBookings, cancelBooking as apiCancelBooking } from '../apiService';

const SuitcaseIconEmptyState: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-6.77 0M12 20.25a15.96 15.96 0 0 1-6.77-3.42A15.96 15.96 0 0 1 12 20.25Zm0 0a15.96 15.96 0 0 0 6.77-3.42A15.96 15.96 0 0 0 12 20.25ZM12 7.5V9m0 3V7.5M12 7.5h.008m-.008 0H12m0 0h.008m-.008 0H12m0 0H9.75M12 3.75A1.5 1.5 0 0 1 13.5 5.25v1.5A1.5 1.5 0 0 1 12 8.25h0A1.5 1.5 0 0 1 10.5 6.75v-1.5A1.5 1.5 0 0 1 12 3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 6.75V5.25a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.25v1.5" />
  </svg>
);

const BookingStatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
  let bgColor = 'bg-neutral-light';
  let textColor = 'text-neutral-darkest';
  let borderColor = 'border-neutral';

  switch (status) {
    case 'Confirmed':
      bgColor = 'bg-success-light';
      textColor = 'text-green-700';
      borderColor = 'border-green-300';
      break;
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      borderColor = 'border-yellow-300';
      break;
    case 'Completed':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      borderColor = 'border-blue-300';
      break;
    case 'Cancelled':
      bgColor = 'bg-error-light';
      textColor = 'text-red-700';
      borderColor = 'border-red-300';
      break;
  }
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor} border ${borderColor}`}>
      {status}
    </span>
  );
};

const MyBookingsPage: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (currentUser) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getUserBookings();
        setBookings(response.data.sort((a: Booking, b: Booking) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()));
      } catch (err: any) {
        console.error("Failed to fetch bookings:", err);
        setError(err.response?.data?.message || "Could not load your bookings.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setBookings([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    fetchBookings();
  }, [currentUser, authLoading]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await apiCancelBooking(bookingId);
      fetchBookings();
    } catch (err: any) {
      console.error("Failed to cancel booking:", err);
      setError(err.response?.data?.message || "Could not cancel booking. Please try again.");
    }
  };

  if (isLoading || authLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Loading your bookings..." size="lg"/></div>;
  }

  if (error && bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-error text-xl">{error}</p>
        <button onClick={fetchBookings} className="mt-4 bg-primary text-white py-2 px-4 rounded-lg">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">My Bookings</h1>
        <p className="text-lg text-text-light max-w-xl mx-auto leading-relaxed">
          Here's a history of your adventures booked with us.
        </p>
      </header>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-lg rounded-xl overflow-hidden border border-neutral-light/70 hover:shadow-xl transition-shadow duration-200">
              <div className="p-6 md:flex md:items-start md:justify-between">
                <div className="md:flex-grow">
                  <h2 className="text-xl font-display font-semibold text-primary mb-1.5">{booking.packageName}</h2>
                  <p className="text-sm text-text-light mb-1">Booking ID: <span className="font-medium text-neutral-dark">{booking.id}</span></p>
                  <p className="text-sm text-text-light mb-1">Booked On: {new Date(booking.bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  {booking.travelDate && 
                    <p className="text-sm text-text-light mb-3">Travel Date: <span className="font-semibold text-secondary">{new Date(booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                  }
                  <div className="flex items-center space-x-4 text-sm text-text-light">
                     <p>Travelers: <span className="font-medium">{booking.numTravelers}</span></p>
                     <p>Total: <span className="font-semibold text-primary text-lg">₹{booking.totalPrice.toLocaleString()}</span></p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-left md:text-right flex flex-col items-start md:items-end">
                  <div className="mb-3">
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  {
                    (booking.status === 'Pending' || booking.status === 'Confirmed') && (
                        <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="mb-2 text-sm text-error hover:text-red-700 hover:underline font-medium transition-colors group"
                        >
                            Cancel Booking
                        </button>
                    )
                  }
                  <Link 
                    to={`/packages/${booking.packageId}`} 
                    className="inline-flex items-center text-sm text-primary hover:text-secondary hover:underline font-medium transition-colors group"
                  >
                    View Package Details <span className="ml-1 transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white p-8 rounded-xl shadow-xl border border-neutral-light/50">
          <SuitcaseIconEmptyState className="w-24 h-24 text-neutral-dark mx-auto mb-6 opacity-25" />
          <h2 className="text-2xl font-semibold text-text-dark mb-4">No Bookings Yet!</h2>
          <p className="text-text-light mb-8 max-w-md mx-auto">
            It looks like you haven't booked any adventures with us. Start planning your next unforgettable trip to Northeast India today!
          </p>
          <Link
            to="/packages"
            className="bg-accent hover:bg-accent-dark text-primary font-semibold py-3.5 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
          >
            Explore Packages
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;