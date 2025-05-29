
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { WishlistItem, TravelPackage } from '../types';
// No direct dependency on AuthContext here, but behavior is implicitly tied to logged-in users via UI components.

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: TravelPackage) => void;
  removeFromWishlist: (itemId: string) => void;
  isItemInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void; // Added for explicit logout handling if needed
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      // Wishlist could be user-specific if we incorporate currentUser.id into the key
      // For now, it's global in localStorage.
      const storedWishlist = localStorage.getItem('wishlist'); 
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Error reading wishlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error writing wishlist to localStorage", error);
    }
  }, [wishlistItems]);

  const addToWishlist = useCallback((item: TravelPackage) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find(i => i.id === item.id)) {
        const wishlistItem: WishlistItem = { ...item }; 
        return [...prevItems, wishlistItem];
      }
      return prevItems;
    });
  }, []);

  const removeFromWishlist = useCallback((itemId: string) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  }, []);

  const isItemInWishlist = useCallback((itemId: string) => {
    return wishlistItems.some(item => item.id === itemId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist'); // Also clear from storage
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isItemInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
