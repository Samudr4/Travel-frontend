import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  color?: string; // e.g., 'border-primary', 'text-accent'
  className?: string; // Allow custom classes
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message, 
  color = 'border-primary', // Default to primary theme color
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]', // Slightly thicker for md
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-[5px]',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-4 ${className}`} role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin`}
        aria-hidden="true" // Decorative element
      ></div>
      {message && <p className="mt-3 text-text-light text-sm tracking-wide">{message}</p>}
      <span className="sr-only">{message || "Loading..."}</span> {/* For screen readers */}
    </div>
  );
};

export default LoadingSpinner;