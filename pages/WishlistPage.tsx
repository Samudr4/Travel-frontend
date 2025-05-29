import React from 'react';
import { Link } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import { useWishlist } from '../contexts/WishlistContext';

const HeartIconEmptyState: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);


const WishlistPage: React.FC = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">My Wishlist</h1>
        <p className="text-lg text-text-light max-w-xl mx-auto leading-relaxed">Your saved adventures. Ready to make them a reality?</p>
      </header>
      {wishlistItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {wishlistItems.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white p-8 rounded-xl shadow-xl border border-neutral-light/50">
          <HeartIconEmptyState className="w-24 h-24 text-neutral-dark mx-auto mb-6 opacity-25" />
          <h2 className="text-2xl font-semibold text-text-dark mb-4">Your Wishlist is Empty</h2>
          <p className="text-text-light mb-8 max-w-md mx-auto">
            Looks like you haven't added any dream destinations yet. Start exploring our unique tours of Northeast India and save your favorites!
          </p>
          <Link
            to="/packages"
            className="bg-accent hover:bg-accent-dark text-primary font-semibold py-3.5 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
          >
            Browse Packages
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;