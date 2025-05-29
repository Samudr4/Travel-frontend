import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PackageCard from '../components/PackageCard';
// import { usePackages } from '../contexts/PackageContext'; // Remove if PackageContext is only for mock data loading
import { TravelPackage } from '../types'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { getTours } from '../apiService'; // Import getTours

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const FunnelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>
);


const PackagesPage: React.FC = () => {
  // const { packages: contextPackages, loadingPackages: contextLoading } = usePackages(); // Original context usage
  const [allPackages, setAllPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'rating_desc' | 'price_asc' | 'price_desc'>('rating_desc');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const fetchPackages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTours();
      // Assuming backend /tours returns data in the format of TravelPackage[]
      // The backend tours.js already populates necessary fields like reviews count/avg rating if needed.
      // If not, additional client-side processing or backend adjustments might be required for rating, etc.
      const mappedPackages = response.data.map((pkg: any) => ({ ...pkg, id: pkg._id }));
      setAllPackages(mappedPackages);
    } catch (err: any) {
      console.error("Failed to fetch packages:", err);
      setError(err.response?.data?.message || "Could not load travel packages.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);


  const availableRegions = useMemo(() => {
    const regions = allPackages.map(pkg => pkg.region).filter((region): region is string => !!region);
    return Array.from(new Set(regions)).sort();
  }, [allPackages]);

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = allPackages.filter(pkg =>
      (pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.region && pkg.region.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedRegion === '' || pkg.region === selectedRegion)
    );

    switch (sortOrder) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
      default:
        filtered.sort((a, b) => b.rating - a.rating); 
        break;
    }
    return filtered;
  }, [searchTerm, sortOrder, selectedRegion, allPackages]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSortOrder('rating_desc');
  };

  const inputBaseClass = "w-full p-3 border border-neutral-darkest/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm";
  const selectBaseClass = `${inputBaseClass} appearance-none cursor-pointer bg-white`;

  if (isLoading && allPackages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
        <LoadingSpinner message="Loading travel packages..." size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">Explore Our North East Tours</h1>
        <p className="text-lg text-text-light max-w-xl mx-auto leading-relaxed">Find the perfect adventure tailored to your desires in the breathtaking landscapes of Northeast India.</p>
      </header>
      
      <div className="mb-10 p-6 bg-white shadow-lg rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 items-end border border-neutral-light/50">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-text-dark mb-1.5">Search Tours</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-neutral-dark" />
            </div>
            <input
                id="search"
                type="text"
                placeholder="e.g., Meghalaya, Tawang"
                className={`${inputBaseClass} pl-10`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search for tours by name, destination, or region"
            />
          </div>
        </div>
         <div>
          <label htmlFor="region" className="block text-sm font-medium text-text-dark mb-1.5">Filter by Region</label>
          <div className="relative">
            <select
              id="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`${selectBaseClass} pr-10`}
              aria-label="Filter tours by region"
            >
              <option value="">All Regions</option>
              {availableRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-neutral-dark" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-text-dark mb-1.5">Sort By</label>
           <div className="relative">
            <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className={`${selectBaseClass} pr-10`}
                aria-label="Sort tours"
            >
                <option value="rating_desc">Rating (High to Low)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-dark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                </svg>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && allPackages.length > 0 && <div className="my-8"><LoadingSpinner message="Refreshing package list..." /></div>}
      {error && (
        <div className="text-center py-16 bg-white p-8 rounded-xl shadow-xl border border-red-300">
            <h2 className="text-2xl font-semibold text-red-600 mb-3">Error Loading Packages</h2>
            <p className="text-text-light mb-6">{error}</p>
            <button 
                onClick={fetchPackages} 
                className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg">
                Try Again
            </button>
        </div>
      )}

      {!isLoading && !error && filteredAndSortedPackages.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {filteredAndSortedPackages.map((pkgItem: TravelPackage) => {
            console.log('Rendering PackageCard for pkgItem:', pkgItem);
            return <PackageCard key={pkgItem.id} pkg={pkgItem} />;
          })}
        </div>
      ) : (
        !isLoading && !error && (
            <div className="text-center py-16 bg-white p-8 rounded-xl shadow-xl border border-neutral-light/50">
                <SearchIcon className="w-24 h-24 text-neutral-dark mx-auto mb-6 opacity-25" />
                <h2 className="text-2xl font-semibold text-text-dark mb-3">No Packages Found</h2>
                <p className="text-text-light mb-8 max-w-md mx-auto">
                    Sorry, we couldn't find any packages matching your current search and filter criteria. Try adjusting them or explore all our offerings.
                </p>
                <button 
                    onClick={resetFilters}
                    className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-7 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2"
                >
                    Clear Filters & Search
                </button>
            </div>
        )
      )}
    </div>
  );
};

export default PackagesPage;
