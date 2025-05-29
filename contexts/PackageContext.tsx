
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { TravelPackage, Review } from '../types';
import { SAMPLE_PACKAGES } from '../constants'; // Initial seed

const MOCK_EMPTY_REVIEWS_CTX: Review[] = [];

interface PackageContextType {
  packages: TravelPackage[];
  addPackage: (newPackageData: Omit<TravelPackage, 'id'>) => void; // id will be generated
  updatePackage: (updatedPackage: TravelPackage) => void;
  deletePackage: (packageId: string) => void;
  getPackageById: (packageId: string) => TravelPackage | undefined;
  loadingPackages: boolean;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

const ADMIN_MANAGED_PACKAGES_KEY = 'adminManagedPackages';

export const PackageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(true);

  useEffect(() => {
    setLoadingPackages(true);
    let loadedPackages: TravelPackage[] = [];
    try {
      const storedPackagesJson = localStorage.getItem(ADMIN_MANAGED_PACKAGES_KEY);
      if (storedPackagesJson) {
        loadedPackages = JSON.parse(storedPackagesJson);
      } else {
        // Initialize from SAMPLE_PACKAGES and store it
        loadedPackages = [...SAMPLE_PACKAGES]; // Create a mutable copy
        localStorage.setItem(ADMIN_MANAGED_PACKAGES_KEY, JSON.stringify(loadedPackages));
      }
    } catch (error) {
      console.error("Error loading packages from localStorage:", error);
      // Fallback to SAMPLE_PACKAGES if localStorage is corrupted
      loadedPackages = [...SAMPLE_PACKAGES];
      localStorage.setItem(ADMIN_MANAGED_PACKAGES_KEY, JSON.stringify(loadedPackages));
    }
    // Ensure packages are sorted by name initially for consistent display if desired
    setPackages(loadedPackages.sort((a, b) => a.name.localeCompare(b.name)));
    setLoadingPackages(false);
  }, []);

  const persistPackages = (updatedPackages: TravelPackage[]) => {
    const sortedPackages = [...updatedPackages].sort((a, b) => a.name.localeCompare(b.name));
    setPackages(sortedPackages);
    localStorage.setItem(ADMIN_MANAGED_PACKAGES_KEY, JSON.stringify(sortedPackages));
  };

  const addPackage = useCallback((newPackageData: Omit<TravelPackage, 'id'>) => {
    setLoadingPackages(true);
    // Ensure all fields from TravelPackage are present, with defaults for optional ones not in newPackageData
    const newPackage: TravelPackage = {
      id: `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: newPackageData.name || 'Unnamed Package',
      destination: newPackageData.destination || 'Unknown Destination',
      region: newPackageData.region, // Can be undefined
      duration: newPackageData.duration || 7,
      price: newPackageData.price || 0,
      description: newPackageData.description || '',
      longDescription: newPackageData.longDescription || '',
      imageUrl: newPackageData.imageUrl || `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/600/400`,
      rating: newPackageData.rating !== undefined ? newPackageData.rating : 0,
      reviews: newPackageData.reviews || MOCK_EMPTY_REVIEWS_CTX,
      activities: Array.isArray(newPackageData.activities) ? newPackageData.activities : [],
      whatsIncluded: Array.isArray(newPackageData.whatsIncluded) ? newPackageData.whatsIncluded : [],
      bestTimeToVisit: newPackageData.bestTimeToVisit, // Can be undefined
    };
    persistPackages([...packages, newPackage]);
    setLoadingPackages(false);
  }, [packages]);

  const updatePackage = useCallback((updatedPackage: TravelPackage) => {
    setLoadingPackages(true);
    persistPackages(packages.map(p => p.id === updatedPackage.id ? updatedPackage : p));
    setLoadingPackages(false);
  }, [packages]);

  const deletePackage = useCallback((packageId: string) => {
    setLoadingPackages(true);
    persistPackages(packages.filter(p => p.id !== packageId));
    setLoadingPackages(false);
  }, [packages]);

  const getPackageById = useCallback((packageId: string): TravelPackage | undefined => {
    return packages.find(p => p.id === packageId);
  }, [packages]);


  return (
    <PackageContext.Provider value={{ packages, addPackage, updatePackage, deletePackage, getPackageById, loadingPackages }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackages must be used within a PackageProvider');
  }
  return context;
};
