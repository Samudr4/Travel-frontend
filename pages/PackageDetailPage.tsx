import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { TravelPackage, Review as ReviewType } from '../types';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTourById, submitReview as apiSubmitReview, editReview, deleteReview } from '../apiService';

// Star SVG Icons
const StarIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);
const StarIconOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.82.61l-4.725-2.885a.562.562 0 0 0-.652 0l-4.725 2.885a.562.562 0 0 1-.82-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

// Heart SVG Icons
const HeartIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C6.368 17.034 2.25 13.036 2.25 8.625 2.25 5.292 4.975 2.5 8.374 2.5c1.893 0 3.624.973 4.626 2.555C13.999 3.473 15.73 2.5 17.624 2.5c3.399 0 6.124 2.792 6.124 6.125 0 4.411-4.118 8.409-8.805 12.285Z" />
  </svg>
);
const HeartIconOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const CalendarDaysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.06 0l4-5.5Z" clipRule="evenodd" />
  </svg>
);

const PackageDetailPage: React.FC = () => {
  const { id: packageId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { currentUser } = useAuth();

  const [reviewRating, setReviewRating] = useState<number>(0); 
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hoverReviewRating, setHoverReviewRating] = useState(0);

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(0);
  const [editComment, setEditComment] = useState('');
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);

  // Add state for gallery
  const [galleryIndex, setGalleryIndex] = useState(0);
  const images = pkg?.imageUrls && pkg.imageUrls.length > 0 ? pkg.imageUrls : [pkg?.imageUrl];

  // Find the current user's review, if any
  const userReview = currentUser && pkg?.reviews?.find(r => r.userId === (currentUser._id || currentUser.id));
  const isAdmin = currentUser?.role === 'admin';

  const calculateAverageRating = (reviews?: ReviewType[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / reviews.length).toFixed(1));
  };

  const fetchPackageDetails = useCallback(async () => {
    if (!packageId) {
      navigate('/packages', { replace: true });
      return;
    }
    setPageLoading(true);
    setError(null);
    try {
      const response = await getTourById(packageId);
      const fetchedPkgData = response.data; // Original data with _id and raw reviews

      const mappedReviews: ReviewType[] = (fetchedPkgData.reviews || []).map((review: any) => ({
        id: review._id ? review._id.toString() : `temp-${Math.random().toString(36).substr(2, 9)}`, // Map review _id to id
        packageId: fetchedPkgData._id ? fetchedPkgData._id.toString() : packageId, // Add packageId from parent tour
        userId: review.user?._id ? review.user._id.toString() : (review.user ? review.user.toString() : ''), // Handle populated/unpopulated user
        userName: review.user?.name || review.userName || 'Anonymous', // Prefer populated name, fallback
        comment: review.comment,
        rating: review.rating,
        createdAt: review.createdAt ? new Date(review.createdAt).toISOString() : new Date().toISOString(), // Ensure ISO string
      }));

      // Sort mapped reviews by date
      mappedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const mappedPkg: TravelPackage = {
        ...fetchedPkgData,
        id: fetchedPkgData._id ? fetchedPkgData._id.toString() : packageId, // Map main package _id to id
        reviews: mappedReviews, // Assign the fully mapped and sorted reviews
      };
      
      setPkg(mappedPkg);
    } catch (err: any) {
      console.error("Failed to fetch package details:", err);
      setError(err.response?.data?.message || "Could not load package details.");
    } finally {
      setPageLoading(false);
    }
  }, [packageId, navigate]);

  useEffect(() => {
    fetchPackageDetails();
  }, [fetchPackageDetails]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !pkg) {
      setReviewError(currentUser ? "Package details not loaded. Cannot submit review." : "Please log in to submit a review.");
      return;
    }
    if (reviewRating < 1 || reviewRating > 5) {
      setReviewError("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (reviewComment.trim().length < 10) {
      setReviewError("Review comment must be at least 10 characters long.");
      return;
    }
    setReviewError('');

    try {
      const reviewData = {
        packageId: pkg.id,
        rating: reviewRating,
        comment: reviewComment.trim(),
      };
      // Capture the response from the backend
      const response = await apiSubmitReview(reviewData);
      const newReviewFromServer = response.data; // This is the review subdocument from backend

      // Map the new review from server to ReviewType for frontend state
      const mappedNewReview: ReviewType = {
        id: newReviewFromServer._id.toString(), // Backend sends _id for subdocument
        packageId: pkg.id, // Parent package ID
        userId: newReviewFromServer.user.toString(), // Backend sends user ID string
        userName: newReviewFromServer.userName,
        rating: newReviewFromServer.rating,
        comment: newReviewFromServer.comment,
        createdAt: new Date(newReviewFromServer.createdAt).toISOString(),
      };

      // Optimistically update the local state
      setPkg(prevPkg => {
        if (!prevPkg) return null;
        const updatedReviews = [mappedNewReview, ...(prevPkg.reviews || [])];
        // Optional: Re-sort if needed, though prepending keeps new one at top if sorted by date desc
        updatedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return {
          ...prevPkg,
          reviews: updatedReviews,
          // Optionally, recalculate average rating locally for immediate UI feedback
          // rating: calculateAverageRating(updatedReviews), // Ensure calculateAverageRating is available and correct
          // reviewCount: updatedReviews.length, // Or use reviewCount from Tour model if available
        };
      });

      setReviewComment('');
      setReviewRating(0);
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 4000);

      // Fetch canonical data from server to ensure consistency
      // This will also update rating and reviewCount from the server's perspective.
      await fetchPackageDetails();

    } catch (err: any) {
      console.error("Review submission failed:", err);
      let errorMessage = "Failed to submit review. Please try again.";
      if (err.response) {
        // Backend error
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.errors?.[0]?.msg) {
          errorMessage = err.response.data.errors[0].msg;
        } else if (err.response.status === 401) {
          errorMessage = "Authentication error. Please log in again.";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection.";
      }
      setReviewError(errorMessage);
    }
  };

  const handleEditClick = (review: ReviewType) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditError('');
    setEditSuccess(false);
  };

  const handleEditCancel = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditComment('');
    setEditError('');
    setEditSuccess(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReviewId) return;
    if (editRating < 1 || editRating > 5) {
      setEditError('Please select a rating between 1 and 5 stars.');
      return;
    }
    if (editComment.trim().length < 10) {
      setEditError('Review comment must be at least 10 characters long.');
      return;
    }
    setEditError('');
    try {
      await editReview(editingReviewId, { rating: editRating, comment: editComment.trim() });
      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 2000);
      setEditingReviewId(null);
      setEditRating(0);
      setEditComment('');
      await fetchPackageDetails();
    } catch (err: any) {
      setEditError('Failed to update review.');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(reviewId);
      await fetchPackageDetails();
    } catch (err: any) {
      alert('Failed to delete review.');
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <LoadingSpinner message="Loading package details..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-red-500">Error: {error}</p>
        <Link to="/packages" className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-md">Back to Packages</Link>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="text-center py-10">
        <p>Package not found.</p>
        <Link to="/packages" className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-md">Back to Packages</Link>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some(item => item.id === pkg.id);

  const handleWishlistToggle = () => {
     if (!currentUser) {
      if(window.confirm("You need to be logged in to manage your wishlist. Log in now?")) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      }
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(pkg.id);
    } else {
      addToWishlist(pkg);
    }
  };
  
  const renderStarsDisplay = (currentRating: number, starSize: string = "w-5 h-5") => {
    const stars = [];
    const fullStars = Math.floor(currentRating);
    const halfStar = currentRating % 1 >= 0.4 && currentRating % 1 < 0.9; 
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<StarIconSolid key={`full-${i}`} className={`${starSize} text-accent`} />);
        } else if (i === fullStars + 1 && halfStar) {
             stars.push(
              <svg key={`half-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${starSize} text-accent`}>
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354V3.287Z" clipRule="evenodd" />
              </svg>
            );
        } else {
            stars.push(<StarIconOutline key={`empty-${i}`} className={`${starSize} text-accent/60`} />);
        }
    }
    return <div className="flex space-x-0.5">{stars}</div>;
  };
  
  const renderInteractiveStars = (currentRating: number, setRatingFn: (r: number) => void, starSize: string = "w-7 h-7", currentHoverRating: number, setHoverRatingFn: (r: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = currentHoverRating ? i <= currentHoverRating : i <= currentRating;
      stars.push(
        <button 
          key={i} 
          type="button"
          onClick={() => setRatingFn(i)} 
          onMouseEnter={() => setHoverRatingFn(i)}
          onMouseLeave={() => setHoverRatingFn(0)}
          className={`focus:outline-none transform hover:scale-110 transition-transform duration-100 ${isFilled ? 'text-accent' : 'text-neutral-dark/50'}`}
          aria-label={`Set rating to ${i}`}
          title={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          {isFilled ? <StarIconSolid className={starSize} /> : <StarIconOutline className={`${starSize}`} />}
        </button>
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-neutral-light/50">
      <div className="lg:flex">
        <div className="lg:w-2/5 xl:w-1/2 relative overflow-hidden">
          {/* Image Gallery/Carousel */}
          <div className="relative w-full h-72 md:h-96 lg:h-full">
            <img
              src={images[galleryIndex] || 'https://picsum.photos/seed/default-large/800/600'}
              alt={pkg.name}
              className="w-full h-72 md:h-96 lg:h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none transition-all duration-300"
            />
            {images.length > 1 && (
              <>
                {/* Prev Button */}
                <button
                  onClick={() => setGalleryIndex((galleryIndex - 1 + images.length) % images.length)}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                {/* Next Button */}
                <button
                  onClick={() => setGalleryIndex((galleryIndex + 1) % images.length)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
          {pkg.region && <span className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-md shadow-md">{pkg.region}</span>}
        </div>
        <div className="lg:w-3/5 xl:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-2.5">{pkg.name}</h1>
            <p className="text-md text-text-light mb-1.5"><span className="font-semibold">Destination:</span> {pkg.destination}</p>
            <p className="text-md text-text-light mb-3"><span className="font-semibold">Duration:</span> {pkg.duration} days</p>
            {pkg.bestTimeToVisit && (
              <p className="text-sm text-secondary mb-4 flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2 text-secondary/80" /> Best Time to Visit: <span className="font-medium ml-1.5">{pkg.bestTimeToVisit}</span>
              </p>
            )}
            
            <div className="flex items-center mb-6">
              {renderStarsDisplay(pkg.rating, "w-6 h-6")}
              <span className="ml-3 text-text-light text-md">({pkg.rating.toFixed(1)} from {(pkg.reviews || []).length} review{(pkg.reviews || []).length !== 1 ? 's' : ''})</span>
            </div>

            <p className="text-4xl font-bold text-primary mb-8">₹{pkg.price.toLocaleString()}</p>
          </div>
          
          <div className="mt-auto space-y-4">
            <Link 
              to={`/booking/${pkg.id}`}
              className="w-full block bg-accent hover:bg-accent-dark text-primary font-bold py-4 px-6 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
            >
              Book This Tour Now
            </Link>
            <button
                onClick={handleWishlistToggle}
                className={`w-full flex items-center justify-center border-2 py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                  isInWishlist 
                  ? 'bg-red-500 text-white border-red-600 hover:bg-red-600 focus:ring-red-500/50' 
                  : 'bg-transparent text-primary border-primary hover:bg-primary/5 focus:ring-primary/50'
                }`}
              >
                {isInWishlist ? <HeartIconSolid className="mr-2.5 w-5 h-5"/> : <HeartIconOutline className="mr-2.5 w-5 h-5"/>}
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 lg:p-10 space-y-10">
        <div>
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">About This Trip</h2>
            <div 
                className="prose prose-sm sm:prose-base max-w-none text-text-light leading-relaxed whitespace-pre-line prose-headings:text-secondary prose-a:text-secondary prose-strong:text-text-dark"
                dangerouslySetInnerHTML={{ __html: pkg.longDescription }}
            />
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <h3 className="text-xl font-display font-semibold text-primary mb-3.5">Key Activities</h3>
            <ul className="space-y-2.5 text-text-light">
              {pkg.activities.map(activity => (
                <li key={activity} className="flex items-start">
                    <CheckCircleIcon className="mr-2.5 mt-0.5 shrink-0 w-5 h-5 text-secondary" /> <span>{activity}</span>
                </li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold text-primary mb-3.5">What's Included</h3>
            <ul className="space-y-2.5 text-text-light">
              {pkg.whatsIncluded.map(item => (
                <li key={item} className="flex items-start">
                    <CheckCircleIcon className="mr-2.5 mt-0.5 shrink-0 w-5 h-5 text-secondary" /> <span>{item}</span>
                </li>))}
            </ul>
          </div>
        </div>

        <div>
            <h2 className="text-2xl font-display font-semibold text-primary mb-6">Reviews & Ratings</h2>
            {(pkg.reviews || []).length > 0 ? (
            <div className="space-y-6">
                {(pkg.reviews || []).map((review) => (
                <div key={review.id} className="bg-neutral-lightest rounded-lg border border-neutral-light/60 p-5">
                  <div className="flex items-center mb-1">
                    {renderStarsDisplay(review.rating, "w-5 h-5")}
                    <span className="font-semibold text-text-dark ml-3">{review.userName || 'Anonymous User'}</span>
                  </div>
                  <div className="mb-2 text-xs italic text-neutral-dark">{new Date(review.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div className="text-sm text-text-dark mb-1">{review.comment}</div>
                  {(currentUser && (review.userId === (currentUser._id || currentUser.id) || isAdmin)) && (
                    <div className="flex space-x-2 mt-2">
                      {review.userId === (currentUser._id || currentUser.id) && (
                        <button onClick={() => handleEditClick(review)} className="text-primary underline text-xs">Edit</button>
                      )}
                      <button onClick={() => handleDeleteReview(review.id)} className="text-error underline text-xs">Delete</button>
                    </div>
                  )}
                </div>
                ))}
            </div>
            ) : (
            <p className="text-text-light mb-8 p-4 bg-neutral-lightest rounded-md text-center border border-neutral-light">No reviews yet for this package. Be the first to share your experience!</p>
            )}
        </div>

        {/* Review form: only show if user is logged in and hasn't reviewed, or is editing */}
        {currentUser && !userReview && !editingReviewId && (
            <div className="bg-neutral-lightest p-6 md:p-8 rounded-xl shadow-sm border border-neutral-light mt-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-5">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">Your Rating:</label>
                        <div className="flex space-x-1">
                            {renderInteractiveStars(reviewRating, setReviewRating, "w-7 h-7", hoverReviewRating, setHoverReviewRating)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="reviewComment" className="block text-sm font-medium text-text-dark mb-1.5">Your Comment:</label>
                        <textarea
                            id="reviewComment"
                            value={reviewComment}
                            onChange={e => setReviewComment(e.target.value)}
                            rows={4}
                            className="w-full p-3 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                            placeholder="Share your experience with this package..."
                            required
                            aria-required="true"
                        />
                    </div>
                    {reviewError && <p className="text-error text-sm p-3 bg-error-light rounded-md border border-error/30">{reviewError}</p>}
                    {reviewSubmitted && <p className="text-success text-sm p-3 bg-success-light rounded-md border border-success/30">Thank you! Your review has been submitted successfully.</p>}
                    <button
                        type="submit"
                        className="bg-accent hover:bg-accent-dark text-primary font-semibold py-3 px-7 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
                        disabled={reviewSubmitted || (reviewRating === 0 || reviewComment.trim().length < 10)}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailPage;
