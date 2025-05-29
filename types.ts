export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  region?: string; // e.g., Meghalaya, Sikkim for filtering
  duration: number; // in days
  price: number;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageUrls?: string[];
  rating: number; // 1-5
  reviews?: Review[]; // Make optional for easier new package creation
  activities: string[];
  whatsIncluded: string[];
  bestTimeToVisit?: string;
}

export interface Review {
  id: string;
  packageId: string; // Link review to package
  userId: string; // Link review to user
  userName: string; 
  comment: string;
  rating: number; // 1-5
  createdAt: string;
}

export interface WishlistItem extends TravelPackage {}

export interface User {
  _id?: string; // From backend
  id: string; // Typically mapped from _id
  email: string;
  name: string;
  role: 'user' | 'admin';
  isActive?: boolean; // Added isActive
  createdAt?: string; // Make optional as it might not always be needed for PUT/POST
  phone?: string; // Added from backend model
  address?: { // Added from backend model
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  wishlist?: string[]; // Added from backend model, assuming array of Tour IDs
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string; // for URL
  author: string; // User ID or name
  date: string;
  imageUrl: string;
  summary: string;
  content: string; // HTML or Markdown content
  tags: string[]; // e.g., ['Meghalaya', 'Adventure', 'Nature']
}

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  userId: string;
  customerName: string; // From User.name
  customerEmail: string; // From User.email
  bookingDate: string;
  travelDate?: string; // Optional specific travel date
  numTravelers: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
}

// This is for mock admin data, now renamed to BaseBooking for clarity if needed
export interface MockBooking { // Can be deprecated or merged into Booking
  id: string;
  packageName: string;
  customerName: string;
  bookingDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

// Itinerary types are no longer needed as AI planner is removed
// export interface ItineraryDay { ... }
// export interface GeneratedItinerary { ... }

export interface ActivityLogEntry {
  _id: string; // From backend
  id: string; // Mapped from _id
  action: 'NEW_BOOKING'; // Add other actions as they are implemented
  userId: User | string; // Can be populated User object or just ID string
  bookingId: Booking | string; // Can be populated Booking object or just ID string
  details: string;
  timestamp: string;
}
