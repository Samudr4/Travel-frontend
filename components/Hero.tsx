import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Hero: React.FC = () => {
  return (
    <div 
      className="bg-cover bg-center py-32 md:py-48 px-4 text-white relative rounded-xl overflow-hidden shadow-2xl" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')" }} // More captivating Northeast India landscape
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/30"></div> {/* Adjusted gradient */}
      <div className="container mx-auto text-center relative z-10">
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-shadow-strong">
          {APP_NAME}
        </h1>
        <style>{`
          .text-shadow-strong { /* Renamed for clarity */
            text-shadow: 0px 4px 8px rgba(0,0,0,0.7);
          }
        `}</style>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 text-shadow-strong max-w-3xl mx-auto leading-relaxed opacity-95">
          Explore the Unseen. Embrace the Serene. Discover breathtaking destinations and create unforgettable memories in the heart of Northeast India.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:space-x-6">
          <Link
            to="/packages"
            className="inline-block bg-accent hover:bg-accent-dark text-primary font-bold py-4 px-10 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-black/50"
          >
            Discover Packages
          </Link>
          <Link
            to="/travel-guide"
            className="inline-block bg-secondary hover:bg-primary text-white font-semibold py-4 px-10 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-white/40 focus:outline-none focus:ring-4 focus:ring-secondary/60 focus:ring-offset-2 focus:ring-offset-black/50"
          >
            Read Travel Guides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;