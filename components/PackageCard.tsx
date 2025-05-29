import React from 'react';
import { Link } from 'react-router-dom';
import { TravelPackage } from '../types';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate, useLocation } from 'react-router-dom';


// Star SVG Icon
const StarIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);
const StarIconOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.82.61l-4.725-2.885a.562.562 0 0 0-.652 0l-4.725 2.885a.562.562 0 0 1-.82-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

// Heart SVG Icon for Wishlist
const HeartIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C6.368 17.034 2.25 13.036 2.25 8.625 2.25 5.292 4.975 2.5 8.374 2.5c1.893 0 3.624.973 4.626 2.555C13.999 3.473 15.73 2.5 17.624 2.5c3.399 0 6.124 2.792 6.124 6.125 0 4.411-4.118 8.409-8.805 12.285Z" />
  </svg>
);
const HeartIconOutline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

interface PackageCardProps {
  pkg: TravelPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isInWishlist = wishlistItems.some(item => item.id === pkg.id);

  const handleWishlistToggle = (event: React.MouseEvent) => {
    event.preventDefault(); 
    event.stopPropagation();
    if (!currentUser) {
      if(window.confirm("You need to be logged in to add items to your wishlist. Log in now?")) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search + location.hash)}`);
      }
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(pkg.id);
    } else {
      addToWishlist(pkg);
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // Check for half star
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIconSolid key={`full-${i}`} className="text-accent" />);
      } else if (i === fullStars + 1 && halfStar) {
        // For simplicity, we'll use a full star for half ratings too in this card, or you can implement a half star icon.
        // stars.push(<StarIconHalf key={`half-${i}`} className="text-accent" />); 
        stars.push(<StarIconSolid key={`half-as-full-${i}`} className="text-accent" />); // Using full for .5+ for simplicity
      }
      else {
        stars.push(<StarIconOutline key={`empty-${i}`} className="text-accent/70" />);
      }
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col group border border-transparent hover:border-primary/20">
      <div className="relative overflow-hidden"> 
        <Link to={`/packages/${pkg.id}`} className="block">
            <img 
                src={(pkg.imageUrls && pkg.imageUrls.length > 0 ? pkg.imageUrls[0] : pkg.imageUrl) || 'https://picsum.photos/seed/default/600/400'} 
                alt={pkg.name} 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                loading="lazy"
            />
        </Link>
        <button
            onClick={handleWishlistToggle}
            className="absolute top-3.5 right-3.5 p-2.5 bg-white/90 rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent/70 transition-all duration-200 shadow-md hover:scale-110 active:scale-95"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            {isInWishlist ? <HeartIconSolid className="text-red-500" /> : <HeartIconOutline className="text-neutral-dark hover:text-red-400" />}
        </button>
        {pkg.region && <span className="absolute top-3.5 left-3.5 bg-secondary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">{pkg.region}</span>}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/packages/${pkg.id}`} className="block">
            <h3 className="text-lg font-display font-semibold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-200 truncate" title={pkg.name}>{pkg.name}</h3>
        </Link>
        <p className="text-xs text-neutral-dark mb-1"><span className="font-medium">Destination:</span> {pkg.destination}</p>
        <p className="text-xs text-neutral-dark mb-2.5"><span className="font-medium">Duration:</span> {pkg.duration} days</p>
        
        <div className="flex items-center mb-3.5 text-xs text-neutral-dark">
          {renderStars(pkg.rating)}
          <span className="ml-2">({(pkg.reviews || []).length} review{(pkg.reviews || []).length !== 1 ? 's' : ''})</span>
        </div>
        
        <p className="text-text-light text-sm mb-4 flex-grow leading-relaxed line-clamp-3">{pkg.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-light/70">
          <p className="text-xl font-semibold text-primary">₹{pkg.price.toLocaleString()}</p>
          <Link
            to={`/packages/${pkg.id}`}
            className="bg-accent hover:bg-accent-dark text-primary font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;