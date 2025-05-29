import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PackageCard from '../components/PackageCard';
// import { usePackages } from '../contexts/PackageContext'; // Remove if PackageContext is only for mock data loading
import { TravelPackage } from '../types'; // Added TravelPackage import
import { APP_NAME } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTours } from '../apiService'; // Import getTours

// SVG Icons - Updated for better visual appeal & consistency
const CompassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.002 9.002 0 0 0 8.131-12.642A9.002 9.002 0 0 0 3.869 8.358 9.002 9.002 0 0 0 12 21Zm0 0V3m0 0L8.25 7.5M12 3l3.75 4.5M12 3a8.963 8.963 0 0 1 4.874 1.626m-8.748 0A8.963 8.963 0 0 1 12 3Z" />
  </svg>
);

const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L22.125 9l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L15 3l-2.846.813a4.5 4.5 0 0 0-3.09 3.09L9.875 6l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15 12Zm0 0-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L9 21.75l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L15.75 15l2.5 2.25L18.25 12Z" />
    </svg>
);

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.013M13.5 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM8.25 18.75a9 9 0 0 1 .069-2.25m0 0a9 9 0 0 0-4.128-1.974 3 3 0 1 0-3.742 5.013 9.093 9.093 0 0 0 3.742.479M9.75 9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm6.75 6a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
);

const HomePage: React.FC = () => {
  // const { packages: contextPackages, loadingPackages: contextLoading } = usePackages(); // Original context usage
  const [allPackages, setAllPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackagesForHome = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTours();
      // Assuming backend /tours returns data in the format of TravelPackage[]
      const mappedPackages = response.data.map((pkg: any) => ({ ...pkg, id: pkg._id }));
      setAllPackages(mappedPackages);
    } catch (err: any) {
      console.error("Failed to fetch packages for home page:", err);
      setError(err.response?.data?.message || "Could not load travel packages at this time.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackagesForHome();
  }, [fetchPackagesForHome]);
  
  const featuredPackages = useMemo(() => {
    return [...allPackages]
      .sort((a, b) => b.rating - a.rating) // Ensure rating is available and consistent
      .slice(0, 3);
  }, [allPackages]);

  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />

      <section className="py-12 md:py-16 bg-white rounded-xl shadow-xl border border-neutral-light/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-primary mb-4">
            Why Explore With {APP_NAME}?
          </h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-12 md:mb-16 text-lg leading-relaxed">
            We curate authentic experiences, connecting you with the vibrant cultures and stunning natural beauty of Northeast India.
          </p>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 text-center">
            {[
              { icon: <CompassIcon className="text-accent w-10 h-10 group-hover:scale-110 transition-transform duration-200"/>, title: 'Authentic Experiences', desc: 'Immerse yourself in local traditions, festivals, and lifestyles for a truly genuine adventure.'},
              { icon: <LeafIcon className="text-accent w-10 h-10 group-hover:scale-110 transition-transform duration-200"/>, title: 'Breathtaking Nature', desc: 'Discover pristine landscapes, from majestic mountains and lush valleys to unique flora and fauna.'},
              { icon: <UsersIcon className="text-accent w-10 h-10 group-hover:scale-110 transition-transform duration-200"/>, title: 'Expert Local Guides', desc: 'Our knowledgeable local guides enhance your journey with insights and stories you won\'t find elsewhere.'}
            ].map(item => (
                <div key={item.title} className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-neutral-lightest transform hover:-translate-y-1.5 group border border-transparent hover:border-primary/20">
                  <div className="flex justify-center items-center mb-6 w-20 h-20 rounded-full bg-primary/10 mx-auto group-hover:bg-accent/10 transition-colors duration-200">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2.5">{item.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-primary mb-12 md:mb-16">
            Featured Travel Packages
          </h2>
          {isLoading && allPackages.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner message="Loading featured packages..." />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>Error: {error}</p>
              <button onClick={fetchPackagesForHome} className="mt-2 bg-primary text-white py-1 px-3 rounded">Try Again</button>
            </div>
          ) : featuredPackages.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
             <p className="text-center text-text-light py-8">No featured packages available at the moment. Please check back later!</p>
          )}
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/packages"
              className="bg-primary hover:bg-secondary text-white font-semibold py-3.5 px-10 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary text-white rounded-xl shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready for Your North East Adventure?</h2>
          <p className="text-xl mb-10 max-w-xl mx-auto leading-relaxed opacity-90">
            Browse our handpicked packages or get inspired by our travel guides. Your journey into the extraordinary begins here.
          </p>
          <Link
            to="/packages"
            className="bg-accent hover:bg-accent-dark text-primary font-bold py-4 px-10 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-secondary"
          >
            Explore Tours Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
