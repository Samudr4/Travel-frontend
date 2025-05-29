import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { APP_NAME, NAV_LINKS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import logoSrc from '../assets/logo.png';

// SVG Icons (Consolidated and refined)
const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844.271 1.255.183l.86-.215c.528-.132 1.063.156 1.286.675l.528 1.17a1.09 1.09 0 0 1-.556 1.43l-.86.43c-.411.207-.695.578-.781.995l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894a1.09 1.09 0 0 1-.781-.995l-.86-.43a1.09 1.09 0 0 1-.556-1.43l.528-1.17c.223-.519.758-.807 1.286-.675l.86.215c.411.088.825-.043 1.255-.183.396-.166.71-.506.78-.93l.149-.894Zm-1.657 8.28c.17-.378.358-.717.565-1.024l.203-.305c.431-.646.431-1.459 0-2.105l-.203-.305a6.74 6.74 0 0 0-.565-1.024l-.621-.665a.932.932 0 0 0-1.2-.206l-.58.29c-.47.235-1.004.235-1.474 0l-.58-.29a.932.932 0 0 0-1.2.206l-.621.665c-.198.21-.387.44-.565.68l-.203.305c-.431.646-.431-1.459 0-2.105l.203.305c.178.24.367.47.565.68l.621.665a.932.932 0 0 0 1.2.206l.58.29c.47.235 1.004.235 1.474 0l.58-.29a.932.932 0 0 0 1.2-.206l.621-.665ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
  </svg>
);
const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const HeartIconNav: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
);

const Bars3Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const Navbar: React.FC = () => {
  const { currentUser, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null); 

  const handleLogout = () => {
    logoutUser();
    setAccountDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  }, [location]);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinkClasses = (path: string) => 
    `relative text-neutral-lightest hover:text-accent px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
      location.pathname === path ? 'bg-secondary text-white shadow-inner' : 'hover:bg-primary/60'
    }`;
  
  const activeIndicator = (path: string) =>
    location.pathname === path ? 
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-accent rounded-t-full transition-all duration-200"></span> 
    : null;


  const mobileNavLinkClasses = (path: string) => 
    `block text-neutral-lightest hover:text-accent px-3 py-3.5 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
      location.pathname === path ? 'bg-secondary text-white' : 'hover:bg-primary/80'
    }`;
  
  const dropdownLinkClasses = "flex items-center w-full px-4 py-3 text-sm text-text hover:bg-neutral-lightest transition-colors duration-150 rounded-md";

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center text-white hover:opacity-90 transition-opacity duration-150 ease-in-out group">
            <img src={logoSrc} alt={`${APP_NAME} Logo`} className="h-12 w-auto group-hover:scale-105 transition-transform duration-200" />
            <span className="ml-3 text-2xl font-display font-bold tracking-tight">{APP_NAME}</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.name} to={link.path} className={`${navLinkClasses(link.path)}`}>
                {link.name}
                {activeIndicator(link.path)}
              </Link>
            ))}
            {currentUser && (
                 <Link key="Wishlist" to="/wishlist" className={`${navLinkClasses("/wishlist")}`}>
                    Wishlist
                    {activeIndicator("/wishlist")}
                </Link>
            )}
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-3">
                {currentUser ? (
                <>
                    {isAdmin && (
                    <Link
                        to="/admin/dashboard"
                        className={`${navLinkClasses("/admin/dashboard")} flex items-center`}
                        title="Admin Dashboard"
                    >
                        <CogIcon className="w-5 h-5 mr-1.5" /> Admin
                        {activeIndicator("/admin/dashboard")}
                    </Link>
                    )}
                    <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                        className="flex items-center text-neutral-lightest hover:text-accent px-2 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
                        aria-label="User account"
                        aria-haspopup="true"
                        aria-expanded={accountDropdownOpen}
                    >
                        <UserCircleIcon className="w-7 h-7 mr-1.5" /> Hi, {currentUser.name.split(' ')[0]}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ml-1 transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`}>
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {accountDropdownOpen && (
                        <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-lg shadow-xl py-2 z-50 ring-1 ring-neutral-darkest ring-opacity-10 origin-top-right transition-all duration-150 ease-out transform opacity-100 scale-100">
                          <div className="px-4 py-3 border-b border-neutral-light">
                            <p className="text-sm font-medium text-text truncate">{currentUser.name}</p>
                            <p className="text-xs text-text-light truncate">{currentUser.email}</p>
                          </div>
                          <div className="p-1.5">
                            <Link to="/my-account" className={dropdownLinkClasses}><UserCircleIcon className="w-5 h-5 mr-3 text-primary" />My Account</Link>
                            <Link to="/my-bookings" className={dropdownLinkClasses}><BookOpenIcon className="w-5 h-5 mr-3 text-primary" />My Bookings</Link>
                            <Link to="/wishlist" className={`${dropdownLinkClasses} md:hidden`}><HeartIconNav className="w-5 h-5 mr-3 text-primary" />My Wishlist</Link>
                            {isAdmin && <Link to="/admin/dashboard" className={`${dropdownLinkClasses} sm:hidden`}><CogIcon className="w-5 h-5 mr-3 text-primary" />Admin Dashboard</Link>}
                            <hr className="my-1.5 border-neutral-light" />
                            <button
                                onClick={handleLogout}
                                className={`${dropdownLinkClasses} text-error hover:bg-error-light`}
                            >
                                <LogoutIcon className="w-5 h-5 mr-3" /> Logout
                            </button>
                          </div>
                        </div>
                    )}
                    </div>
                </>
                ) : (
                <>
                    <Link to="/login" className={`${navLinkClasses("/login")}`}>
                        Login
                        {activeIndicator("/login")}
                    </Link>
                    <Link
                    to="/register"
                    className="bg-accent hover:bg-accent-dark text-primary font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent"
                    >
                    Register
                    </Link>
                </>
                )}
            </div>

            <div className="md:hidden ml-2">
              <button
                id="mobile-menu-button"
                ref={mobileMenuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-lightest hover:text-accent focus:outline-none p-2.5 rounded-md hover:bg-primary/60 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
            className="md:hidden absolute top-20 inset-x-0 bg-primary/95 backdrop-blur-md shadow-lg p-4 z-40 border-t border-secondary/50 transition-all duration-200 ease-out origin-top" 
            id="mobile-menu" ref={mobileMenuRef}
            style={{ transform: mobileMenuOpen ? 'scaleY(1)' : 'scaleY(0.95)', opacity: mobileMenuOpen ? 1 : 0 }}
        >
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={`mobile-${link.name}`}
                to={link.path}
                className={mobileNavLinkClasses(link.path)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {currentUser && (
              <Link
                to="/wishlist"
                className={mobileNavLinkClasses("/wishlist")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
            )}
            <hr className="border-neutral-darkest/50 my-3" />
            {currentUser ? (
              <>
                <Link to="/my-account" className={mobileNavLinkClasses("/my-account")} onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                <Link to="/my-bookings" className={mobileNavLinkClasses("/my-bookings")} onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
                {isAdmin && (
                  <Link to="/admin/dashboard" className={mobileNavLinkClasses("/admin/dashboard")} onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
                 <hr className="border-neutral-darkest/50 my-3" />
                <button
                  onClick={handleLogout}
                  className={`${mobileNavLinkClasses("")} w-full text-left flex items-center text-red-300 hover:text-red-100 hover:bg-red-500/30`}
                >
                  <LogoutIcon className="w-5 h-5 mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={mobileNavLinkClasses("/login")} onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-accent hover:bg-accent-dark text-primary font-semibold mt-2 px-4 py-3 rounded-lg text-base transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;