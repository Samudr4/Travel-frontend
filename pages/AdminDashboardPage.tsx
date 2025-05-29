import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { MOCK_BOOKINGS, MOCK_USERS } from '../constants'; // Mock data no longer needed for these stats
import { useAuth } from '../contexts/AuthContext';
// import { usePackages } from '../contexts/PackageContext'; // If counts come from API, this might not be needed here
import { Booking, User as UserType, TravelPackage, ActivityLogEntry } from '../types'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { getTours, getAllBookingsAdmin, getUsersAdmin, getRecentBookingActivities } from '../apiService'; // Import new service
import { StarIconSolid } from '../components/icons/StarIconSolid';

// Icons (assuming they are defined elsewhere or here)
const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-1.586 1.586m0 0L12.75 15l-1.586-1.586M20.25 7.5H3.75m16.5 0v11.25c0 1.242-1.008 2.25-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18.75V7.5m17.25-3H3.75a2.25 2.25 0 0 0-2.25 2.25v11.25a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 20.25 18.75V6.75a2.25 2.25 0 0 0-2.25-2.25Z" />
  </svg>
);
const BookingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM16.5 6v1.5m0 0v1.5m0-1.5h1.5m-1.5 0h-1.5M5.625 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 0v1.5m0-1.5H4.125M5.625 13.5h1.5m0 0v1.5m0-1.5h1.5m0 0v1.5m0-1.5H12m-6.375 0v1.5m0-1.5h1.5M18.375 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 0v1.5m0-1.5H16.875M18.375 13.5h1.5m0 0v1.5m0-1.5h1.5m0 0v1.5m0-1.5h-1.5m6.375 4.5H3.375c-.621 0-1.125-.504-1.125-1.125V10.125c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125Z" />
  </svg>
);
const UsersAdminIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);
const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform duration-150" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const AdminDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [totalPackages, setTotalPackages] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [bookingActivities, setBookingActivities] = useState<ActivityLogEntry[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setDashboardLoading(true);
      setStatsError(null);
      try {
        const [packagesResponse, bookingsResponse, usersResponse] = await Promise.all([
          getTours(),
          getAllBookingsAdmin(),
          getUsersAdmin(),
        ]);
        setTotalPackages(packagesResponse.data.length);
        setTotalBookings(bookingsResponse.data.length);
        setTotalUsers(usersResponse.data.filter((u: UserType) => u.role === 'user').length); // Count only 'user' role for display
      } catch (err: any) {
        console.error("Error fetching dashboard stats:", err);
        setStatsError(err.message || 'Failed to load dashboard statistics.');
      } finally {
        setDashboardLoading(false);
      }
    };

    const fetchActivities = async () => {
      setActivitiesLoading(true);
      setActivitiesError(null);
      try {
        const response = await getRecentBookingActivities(5); // Fetch latest 5
        // Backend should send _id, frontend maps to id if necessary in component or here
        const mappedActivities = response.data.map((act: any) => ({...act, id: act._id}));
        setBookingActivities(mappedActivities);
      } catch (err: any) {
        console.error("Error fetching recent activities:", err);
        setActivitiesError(err.response?.data?.message || err.message || 'Failed to load recent activities.');
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchDashboardData();
    fetchActivities();
  }, []);

  const adminSections = [
    { name: 'Manage Packages', path: '/admin/packages', icon: <PackageIcon />, description: 'View, add, edit, and remove travel packages.', count: totalPackages, itemLabel: 'Total Packages', color: 'primary' },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: <BookingsIcon />, description: 'Oversee all customer bookings and their statuses.', count: totalBookings, itemLabel: 'Total Bookings', color: 'secondary' },
    { name: 'Manage Users', path: '/admin/users', icon: <UsersAdminIcon />, description: 'Manage user accounts and permissions.', count: totalUsers, itemLabel: 'Registered Users', color: 'accent' },
    { name: 'Manage Reviews', path: '/admin/reviews', icon: <StarIconSolid className="w-8 h-8 text-yellow-500" />, description: 'View and moderate all user reviews.', count: null, itemLabel: 'All Reviews', color: 'accent' },
  ];

  const cardColors: { [key: string]: { border: string, text: string, bg: string, hoverBg: string, hoverBorder: string, iconText: string } } = {
    primary: { border: 'border-primary', text: 'text-primary', bg: 'bg-primary/10', hoverBg: 'hover:bg-primary/5', hoverBorder: 'hover:border-primary/70', iconText: 'text-primary' },
    secondary: { border: 'border-secondary', text: 'text-secondary', bg: 'bg-secondary/10', hoverBg: 'hover:bg-secondary/5', hoverBorder: 'hover:border-secondary/70', iconText: 'text-secondary' },
    accent: { border: 'border-accent', text: 'text-accent', bg: 'bg-accent/10', hoverBg: 'hover:bg-accent/5', hoverBorder: 'hover:border-accent-dark/70', iconText: 'text-accent' },
  };

  if (dashboardLoading) {
      return (
          <div className="p-4 md:p-6 space-y-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
              <LoadingSpinner message="Loading dashboard data..." size="lg" />
          </div>
      );
  }

  return (
    <div className="p-4 md:p-6 space-y-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">Admin Dashboard</h1>
        <p className="text-text-light mt-1.5 text-lg">Welcome, <span className="font-semibold">{currentUser?.name || 'Admin'}</span>! Manage your platform here.</p>
      </div>
      
      {statsError && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 border border-red-300 rounded-md">
          <p className="font-semibold">Error loading statistics:</p>
          <p>{statsError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map(section => {
            const colors = cardColors[section.color];
            return (
            <Link key={section.name} to={section.path} 
                  className={`block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border-l-4 ${colors.border} ${colors.hoverBg} ${colors.hoverBorder} group`}>
                <div className="flex items-start justify-between mb-3">
                    <div className={`p-3.5 rounded-full ${colors.bg} group-hover:scale-110 transition-transform duration-200`}>
                        {React.cloneElement(section.icon, { className: `w-8 h-8 ${colors.iconText}`})}
                    </div>
                    <span className={`text-5xl font-bold ${colors.text} group-hover:${colors.text} transition-colors`}>{section.count}</span>
                </div>
                <h2 className={`text-xl font-display font-semibold ${colors.text} group-hover:${colors.text} transition-colors mb-1`}>{section.name}</h2>
                <p className="text-sm text-text-light mb-1">{section.itemLabel}</p>
                <p className="text-xs text-text-light mt-2 leading-relaxed">{section.description}</p>
                 <span className={`inline-flex items-center mt-4 text-sm font-medium ${colors.text} group-hover:underline`}>
                    Go to {section.name} <ArrowRightIcon />
                 </span>
            </Link>
        )})}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-neutral-light/50">
        <h2 className="text-2xl font-display font-semibold text-primary mb-5">Recent New Bookings</h2>
        {activitiesLoading ? (
            <div className="flex justify-center items-center py-8">
                <LoadingSpinner message="Loading activities..." />
            </div>
        ) : activitiesError ? (
            <p className="text-red-600 p-4 bg-red-100 rounded-md text-center border border-red-200">Error: {activitiesError}</p>
        ) : bookingActivities.length === 0 ? (
             <p className="text-text-light p-4 bg-neutral-lightest rounded-md text-center border border-neutral-light">No recent booking activities to display.</p>
        ) : (
            <ul className="space-y-4">
                {bookingActivities.map((activity) => ( 
                    <li key={activity.id} className="p-3.5 bg-neutral-lightest rounded-lg border border-neutral-light/70 text-sm text-text-dark flex items-center space-x-3 hover:shadow-sm transition-shadow">
                        <BookingsIcon className="w-6 h-6 text-secondary shrink-0" />
                        <div>
                            <p className="whitespace-normal break-words">
                                {activity.details}
                                {(activity.userId && typeof activity.userId === 'object' && 'name' in activity.userId) && 
                                    <span> by <Link to={`/admin/users`} className="font-medium text-primary hover:underline">{(activity.userId as UserType).name}</Link></span>
                                }
                                {(activity.bookingId && typeof activity.bookingId === 'object' && 'id' in activity.bookingId) && 
                                    <span> for <Link to={`/admin/bookings`} className="font-medium text-secondary hover:underline">Booking ID: {(activity.bookingId as Booking).id.slice(-6)}</Link></span>
                                }
                            </p>
                            <span className="text-xs text-text-light block mt-0.5">{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
