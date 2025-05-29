import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import logoSrc from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-darkest text-neutral-light py-12 md:py-16 mt-auto border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: App Name & Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity mb-4 group">
                <img src={logoSrc} alt={`${APP_NAME} Logo`} className="h-10 w-auto group-hover:scale-105 transition-transform"/>
                <span className="ml-3 text-xl font-display font-semibold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-neutral-light/70 leading-relaxed mt-2">
              Your trusted partner for authentic and unforgettable adventures across Northeast India. Discover the unexplored with us.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">About Us</Link></li>
              <li><Link to="/packages" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">Tour Packages</Link></li>
              <li><Link to="/travel-guide" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">Travel Guides</Link></li>
              <li><Link to="/my-account" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal/Support */}
           <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">Contact Us (Mock)</a></li>
              <li><a href="#" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">FAQs (Mock)</a></li>
              {/* Terms of Service and Privacy Policy removed as per request */}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Connect</h4>
            <p className="text-sm text-neutral-light/70 mb-4">Follow us for travel inspiration:</p>
            <div className="flex space-x-5">
              <a href="#" aria-label="Facebook" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zm3.03 7.79H13.4V18h-2.81V9.83H9V7.65h1.59V6.19c0-1.3.66-2.15 2.21-2.15h1.85v2.17h-1.3c-.25 0-.38.13-.38.42v1.19h1.68l-.23 2.14z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2c2.72 0 3.05.01 4.12.06 1.06.05 1.79.22 2.42.46.65.25 1.23.59 1.77.94.54.35.9.79 1.25 1.33.35.54.59.98.79 1.42.28.64.44 1.18.51 1.77.06 1.07.07 1.4.07 4.13s-.01 3.06-.07 4.13c-.07.59-.23 1.13-.51 1.77-.2.44-.44.88-.79 1.42-.35.54-.71.98-1.25 1.33-.54.35-1.12.69-1.77.94-.63.24-1.36.41-2.42.46-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.42-.46-.65-.25-1.23-.59-1.77-.94-.54-.35-.9-.79-1.25-1.33-.35-.54-.59-.98-.79-1.42-.28-.64-.44-1.18-.51-1.77-.06-1.07-.07-1.4-.07-4.13s.01-3.06.07-4.13c.07-.59.23 1.13.51 1.77.2-.44.44-.88.79 1.42.35.54.71.98 1.25 1.33.54.35 1.12.69 1.77.94.63.24 1.36.41 2.42.46C8.95 2.01 9.28 2 12 2zm0 1.8c-2.65 0-2.96.01-4 .06-1.02.05-1.58.21-1.98.37-.47.18-.82.42-1.16.76s-.58.69-.76 1.16c-.16.4-.32.96-.37 1.98C3.81 9.04 3.8 9.35 3.8 12s.01 2.96.06 4c.05 1.02.21 1.58.37 1.98.18.47.42.82.76 1.16s.69.58 1.16.76c.4.16.96.32 1.98.37 1.04.05 1.35.06 4 .06s2.96-.01 4-.06c1.02-.05 1.58-.21 1.98-.37.47-.18.82-.42 1.16-.76s.58.69.76 1.16c.16-.4.32-.96.37-1.98.05-1.04.06-1.35.06-4s-.01-2.96-.06-4c-.05-1.02-.21-1.58-.37-1.98-.18-.47-.42-.82-.76-1.16s-.69-.58-1.16-.76c-.4-.16-.96-.32-1.98-.37-1.04-.05-1.35-.06-4-.06zm0 4.49c2.37 0 4.3 1.93 4.3 4.31s-1.93 4.31-4.3 4.31-4.3-1.93-4.3-4.31 1.93-4.31 4.3-4.31zm0 1.8c-1.38 0-2.5 1.12-2.5 2.51s1.12 2.51 2.5 2.51 2.5-1.12 2.5-2.51-1.12-2.51-2.5-2.51zm4.82-3.22c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2z"/></svg>
              </a>
               <a href="#" aria-label="Twitter" className="text-neutral-light/70 hover:text-accent transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.9-.53 1.59-1.37 1.92-2.38-.84.5-1.78.86-2.79 1.07C18.35 4.49 17.25 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06C3.44 19.29 5.65 20 8.01 20c7.21 0 11.14-5.99 11.14-11.15 0-.17 0-.34-.01-.5A7.95 7.95 0 0 0 22.46 6z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-light/20 pt-10 text-center">
          <p className="text-sm text-neutral-light/70">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="text-xs text-neutral-light/50 mt-2.5">
            Crafted with <span className="text-red-400 mx-0.5">&hearts;</span> for the explorers of Northeast India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;