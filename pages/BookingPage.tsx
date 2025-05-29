import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { usePackages } from '../contexts/PackageContext'; // Import usePackages
import { TravelPackage } from '../types'; // Booking type from API will be slightly different
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { APP_NAME } from '../constants';
import { createBooking, getTourById } from '../apiService'; // Import createBooking and getTourById
import PaymentForm from '../components/PaymentForm';

const BookingPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading: authLoading } = useAuth();
  // const { getPackageById, loadingPackages } = usePackages(); // Keep if still used for initial display, or replace with API call

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [numTravelers, setNumTravelers] = useState<number>(1);
  const [travelDate, setTravelDate] = useState<string>('');
  
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null); // Can be string or null
  const [paymentData, setPaymentData] = useState<any>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (!currentUser) {
      const redirectPath = `/booking/${packageId}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`, { replace: true });
      return;
    }

    setPageLoading(true);
    if (packageId) {
      console.log('[BookingPage] packageId from useParams before API call:', packageId);
      getTourById(packageId)
        .then(response => {
          const fetchedPkgData = response.data; // Original data with _id
          // Map _id to id before setting state
          const mappedPkg: TravelPackage = { ...fetchedPkgData, id: fetchedPkgData._id };
          setPkg(mappedPkg); 
        })
        .catch(err => {
          console.error("Failed to fetch package details:", err);
          setBookingError("Could not load package details. Please try again later.");
          // Optionally navigate away if package not found
          // navigate('/packages', { replace: true });
        })
        .finally(() => setPageLoading(false));
    } else {
      setPageLoading(false);
      navigate('/packages', { replace: true }); // No packageId, redirect
    }
  }, [packageId, navigate, currentUser, location.search, authLoading]);

  const getMinTravelDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); 
    return today.toISOString().split("T")[0];
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !pkg) return;
    if (!travelDate) {
      setBookingError('Please select a preferred travel date.');
      return;
    }
    if (new Date(travelDate) < new Date(getMinTravelDate())) {
      setBookingError(`Travel date must be at least 7 days from today.`);
      return;
    }
    setBookingError(null);
    setIsBooking(true);

    try {
      const bookingData = {
        packageId: pkg.id,
        travelDate,
        numTravelers,
      };
      const response = await createBooking(bookingData);
      setPaymentData(response.data);
      setIsBooking(false);
    } catch (err: any) {
      console.error("Booking creation failed:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Booking failed. Please try again.";
      setBookingError(errorMessage);
      setIsBooking(false);
    }
  };

  const handlePaymentSuccess = (booking: any) => {
    setBookingConfirmed(true);
    setConfirmedBooking(booking);
  };

  const handlePaymentError = (error: string) => {
    setBookingError(error);
  };

  const handleNumTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumTravelers(value);
    }
  };

  if (authLoading || pageLoading) { 
    return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Preparing your booking..." size="lg"/></div>;
  }

  if (!pkg && !pageLoading) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl text-error mb-4">Package not found or error loading details.</p>
        {bookingError && <p className="text-error mb-4">Error: {bookingError}</p>}
        <Link to="/packages" className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg">
          Back to Packages
        </Link>
      </div>
    );
  }
  
  // Ensure pkg is not null before accessing its properties
  if (!pkg) {
      return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Loading package..."/></div>; // Should be caught by above conditions
  }

  if (bookingConfirmed && confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12 text-center border-t-4 border-success">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-success mx-auto mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <h1 className="text-3xl font-display font-bold text-primary mb-4">Booking Confirmed!</h1>
        <p className="text-text-light mb-3 text-lg">
          Thank you, <span className="font-semibold">{confirmedBooking.customerName}</span>, for booking the <strong>{confirmedBooking.packageName}</strong> package.
        </p>
        <p className="text-text-light mb-8">
          Travel Date: <strong className="text-primary">{new Date(confirmedBooking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong><br/>
          Number of Travelers: <strong>{confirmedBooking.numTravelers}</strong><br/>
          Total Paid: <strong>₹{confirmedBooking.totalPrice.toLocaleString()}</strong>
        </p>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-4 justify-center">
          <Link to="/my-bookings" className="block sm:inline-block w-full sm:w-auto bg-secondary hover:bg-primary text-white font-semibold py-3.5 px-7 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary/50 focus:ring-offset-2">View My Bookings</Link>
          <Link to="/packages" className="block sm:inline-block w-full sm:w-auto bg-primary hover:bg-secondary text-white font-semibold py-3.5 px-7 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2">Explore More Packages</Link>
        </div>
      </div>
    );
  }
  
  if (paymentData) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10 border-t-4 border-accent">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-primary mb-1">Complete Your Payment</h1>
          <p className="text-text-light">Please complete the payment to confirm your booking</p>
        </header>
        
        <div className="mb-8 p-5 bg-neutral-lightest rounded-lg border border-neutral-light/70 shadow-sm">
          <h3 className="font-display font-semibold text-lg text-primary mb-3">Booking Summary</h3>
          <div className="space-y-1.5 text-text-light">
            <p><strong>Package:</strong> {paymentData.booking.packageName}</p>
            <p><strong>Travel Date:</strong> {new Date(paymentData.booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p><strong>Number of Travelers:</strong> {paymentData.booking.numTravelers}</p>
            <p><strong>Total Amount:</strong> ₹{paymentData.booking.totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <PaymentForm
          order={paymentData.order}
          booking={paymentData.booking}
          keyId={paymentData.keyId}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    );
  }
  
  const inputBaseClass = "w-full p-3 border border-neutral-darkest/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm";

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10 border-t-4 border-accent">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-display font-bold text-primary mb-1">Book Your Adventure</h1>
        <h2 className="text-xl text-secondary">{pkg.name}</h2>
      </header>
      
      <div className="mb-8 p-5 bg-neutral-lightest rounded-lg border border-neutral-light/70 shadow-sm">
        <h3 className="font-display font-semibold text-lg text-primary mb-3">Package Summary</h3>
        <div className="space-y-1.5 text-text-light">
            <p><strong>Destination:</strong> {pkg.destination}</p>
            <p><strong>Duration:</strong> {pkg.duration} days</p>
            <p><strong>Price per person:</strong> ₹{pkg.price.toLocaleString()}</p>
        </div>
        <p className="font-semibold text-text text-xl mt-4 pt-3.5 border-t border-neutral">Total Price ({numTravelers} traveler{numTravelers > 1 ? 's' : ''}): <span className="text-primary">₹{(pkg.price * numTravelers).toLocaleString()}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1.5">Full Name</label>
          <input type="text" id="name" value={currentUser?.name || ''} disabled className={`${inputBaseClass} bg-neutral-light cursor-not-allowed shadow-inner-sm`} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1.5">Email Address</label>
          <input type="email" id="email" value={currentUser?.email || ''} disabled className={`${inputBaseClass} bg-neutral-light cursor-not-allowed shadow-inner-sm`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
            <label htmlFor="numTravelers" className="block text-sm font-medium text-text-dark mb-1.5">Number of Travelers</label>
            <input 
              type="number" 
              id="numTravelers" 
              value={numTravelers.toString()} 
              onChange={handleNumTravelersChange}
              min="1" 
              required 
              className={inputBaseClass} 
            />
            </div>
            <div>
            <label htmlFor="travelDate" className="block text-sm font-medium text-text-dark mb-1.5">Preferred Travel Date</label>
            <input 
              type="date" 
              id="travelDate" 
              value={travelDate} 
              onChange={e => setTravelDate(e.target.value)} 
              required 
              className={`${inputBaseClass} cursor-pointer`} 
              min={getMinTravelDate()} 
            />
            </div>
        </div>
        
        {bookingError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">{bookingError}</p>}

        <button
          type="submit"
          disabled={isBooking || !pkg}
          className="w-full bg-accent hover:bg-accent-dark text-primary font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
        >
          {isBooking ? <LoadingSpinner size="sm" message="Processing..." color="border-primary"/> : `Confirm Booking & Pay ₹${(pkg.price * numTravelers).toLocaleString()}`}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
