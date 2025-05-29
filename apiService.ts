import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api'; // Adjust based on your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// Auth API calls
export const registerUser = (userData: any) => api.post('/auth/register', userData);
export const loginUser = (credentials: any) => api.post('/auth/login', credentials);
export const getCurrentUser = () => api.get('/auth/me');

// Tour API calls (example)
export const getTours = () => api.get('/tours');
export const getTourById = (id: string) => api.get(`/tours/${id}`);

// Review API Calls
export const submitReview = (reviewData: { packageId: string; rating: number; comment: string; }) => api.post('/reviews', reviewData);
export const getReviewsForTour = (tourId: string) => api.get(`/reviews/${tourId}`);
export const editReview = (reviewId: string, reviewData: { rating?: number; comment?: string }) => api.put(`/reviews/${reviewId}`, reviewData);
export const deleteReview = (reviewId: string) => api.delete(`/reviews/${reviewId}`);

// Booking API calls
export const createBooking = (bookingData: any) => api.post('/bookings', bookingData);
export const getUserBookings = () => api.get('/bookings/my-bookings');
export const getBookingById = (id: string) => api.get(`/bookings/${id}`);
export const cancelBooking = (id: string) => api.patch(`/bookings/${id}/cancel`);

// Admin specific booking calls
export const getAllBookingsAdmin = () => api.get('/bookings');
export const updateBookingStatusAdmin = (id: string, status: string) => api.patch(`/bookings/${id}/status`, { status });


// User API calls (for admin or profile)
export const getUsersAdmin = () => api.get('/users');
export const getUserByIdAdmin = (userId: string) => api.get(`/users/${userId}`);
export const updateUserAdmin = (userId: string, userData: any) => api.patch(`/users/${userId}`, userData);
export const deleteUserAdmin = (userId: string) => api.delete(`/users/${userId}`);

// Profile-specific calls (might be different from admin view/edit of a user)
export const getUserProfile = (userId: string) => api.get(`/users/profile/${userId}`);
export const updateUserProfile = (userId: string, profileData: any) => api.put(`/users/profile/${userId}`, profileData);

// Admin Tour/Package Management
export const createTourAdmin = (tourData: any) => api.post('/tours', tourData);
export const updateTourAdmin = (tourId: string, tourData: any) => api.put(`/tours/${tourId}`, tourData);
export const deleteTourAdmin = (tourId: string) => api.delete(`/tours/${tourId}`);

// Activity Log API calls (Admin)
export const getRecentBookingActivities = (limit: number = 20) => api.get(`/activitylog/recent-bookings?limit=${limit}`);

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: string;
}) => {
  return api.post('/bookings/verify-payment', paymentData);
}; 