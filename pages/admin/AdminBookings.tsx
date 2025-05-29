import React, { useState, useEffect, useCallback } from 'react';
import { Booking } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAllBookingsAdmin, updateBookingStatusAdmin } from '../../apiService';

const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-text-dark" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>
);

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [filterStatus, setFilterStatus] = useState<Booking['status'] | ''>('');
  const [error, setError] = useState<string | null>(null);

  const fetchAllBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllBookingsAdmin();
      // Backend data should already be formatted by formatBookingResponse
      setBookings(response.data.sort((a: Booking, b: Booking) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()));
    } catch (err: any) {
      console.error("Failed to fetch all bookings:", err);
      setError(err.response?.data?.message || "Could not load bookings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const filteredBookings = bookings.filter(booking => 
    filterStatus === '' || booking.status === filterStatus
  );

  const handleUpdateStatus = async (bookingId: string, newStatus: Booking['status']) => {
    if (!window.confirm(`Change status of booking ${bookingId} to ${newStatus}?`)) return;

    setIsProcessing(true);
    setError(null);
    try {
      await updateBookingStatusAdmin(bookingId, newStatus);
      // Refresh the list to show the updated status
      await fetchAllBookings(); 
      // alert(`Booking ${bookingId} status updated to ${newStatus}.`); // Optional: use toast notifications
    } catch (err: any) {
      console.error("Failed to update booking status:", err);
      const updateError = err.response?.data?.message || `Could not update status for booking ${bookingId}.`;
      setError(updateError); // Display error related to this specific action
      // alert(updateError); // Optional: use toast notifications
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadgeClasses = (status: Booking['status']) => {
    switch (status) {
        case 'Confirmed': return 'bg-success-light text-green-700 border border-green-300';
        case 'Pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        case 'Completed': return 'bg-blue-100 text-blue-700 border border-blue-300';
        case 'Cancelled': return 'bg-error-light text-red-700 border border-red-300';
        default: return 'bg-neutral-light text-neutral-darkest border border-neutral';
    }
  };

  if (isLoading && bookings.length === 0) { 
    return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Loading bookings..." size="lg"/></div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-display font-bold text-primary">Manage Bookings</h1>
            <p className="text-text-light mt-1">Oversee all customer bookings and their statuses.</p>
        </div>
        <div className="flex items-center">
            <FilterIcon />
            <label htmlFor="filterStatus" className="text-sm font-medium text-text-dark mr-2 sr-only">Filter by Status:</label>
            <select 
                id="filterStatus"
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value as Booking['status'] | '')}
                className="p-2.5 border border-neutral-darkest/30 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm cursor-pointer appearance-none"
            >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        </div>
      </div>
      
      {isProcessing && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4"><LoadingSpinner message="Updating status..." /></div>}
      {error && <p className="text-center text-red-500 mb-4 p-2 bg-red-100 border border-red-300 rounded-md">Error: {error}</p>}

      {filteredBookings.length > 0 ? (
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-neutral-light/50">
        <table className="w-full min-w-[1000px] text-sm text-left text-text">
          <thead className="text-xs text-text-dark uppercase bg-neutral-lightest border-b border-neutral-light">
            <tr>
              <th scope="col" className="px-6 py-4">Booking ID</th>
              <th scope="col" className="px-6 py-4">Package Name</th>
              <th scope="col" className="px-6 py-4">Customer</th>
              <th scope="col" className="px-6 py-4">Booking Date</th>
              <th scope="col" className="px-6 py-4">Travel Date</th>
              <th scope="col" className="px-6 py-4 text-right">Price (₹)</th>
              <th scope="col" className="px-6 py-4 text-center">Status</th>
              <th scope="col" className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="bg-white border-b border-neutral-light hover:bg-neutral-lightest/60 transition-colors duration-150">
                <td className="px-6 py-4 font-medium text-text-dark whitespace-nowrap">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.packageName}</td>
                <td className="px-6 py-4">
                    <div>{booking.customerName}</div>
                    <div className="text-xs text-text-light">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4">{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
                <td className="px-6 py-4">{booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                <td className="px-6 py-4 text-right">₹{booking.totalPrice.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClasses(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-1">
                    <select 
                        value={booking.status}
                        onChange={(e) => handleUpdateStatus(booking.id, e.target.value as Booking['status'])}
                        className="p-1.5 text-xs border border-neutral-darkest/30 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer disabled:opacity-50"
                        disabled={isProcessing}
                        title="Change booking status"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
         <div className="text-center py-16 bg-white p-8 rounded-xl shadow-lg border border-neutral-light">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20 text-neutral-dark mx-auto mb-6 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 12h19.5m-19.5 3.75h19.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 19.5V4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21.75 4.5v15a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 19.5Z" />
            </svg>
            <p className="text-xl font-semibold text-text-light mb-3">No bookings found matching your criteria.</p>
            <p className="text-text-light">Try selecting a different status or check if there are any bookings.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
