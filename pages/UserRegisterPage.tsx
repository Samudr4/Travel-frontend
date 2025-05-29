import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../constants';

const UserPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.75 15.75m6.75 0v-3.375m0 0h3.375m-3.375 0H10.5m0 0H14.25m-9.75 0h3.375M3.75 15.75v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V15.75m0 0v-3.375m0 0H3.75m0 0h7.5M12 15.75v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V15.75m0 0v-3.375m0 0H12m0 0h7.5" />
    </svg>
);

const UserRegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser, currentUser, loading: authLoading, error: authError, clearError } = useAuth();

  React.useEffect(() => {
    clearError();
    if (currentUser) { 
      navigate('/my-account', { replace: true });
    }
  }, [currentUser, navigate, clearError]);

  const inputBaseClass = "w-full p-3 border border-neutral-darkest/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLocalError('');
    clearError();

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    try {
      await registerUser(name, email, password);
    } catch (err: any) {
      console.error("Registration attempt failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-light to-neutral-lightest">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 space-y-8 border-t-4 border-accent">
         <div className="text-center">
            <UserPlusIcon className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Create Your Account</h1>
            <p className="text-text-light">Join {APP_NAME} and start planning your dream trip!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name_register" className="block text-sm font-medium text-text-dark mb-1.5">Full Name</label>
            <input
              type="text"
              id="name_register"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputBaseClass}
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label htmlFor="email_register" className="block text-sm font-medium text-text-dark mb-1.5">Email Address</label>
            <input
              type="email"
              id="email_register"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputBaseClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password_register" className="block text-sm font-medium text-text-dark mb-1.5">Password</label>
            <input
              type="password"
              id="password_register"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={inputBaseClass}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label htmlFor="confirm_password_register" className="block text-sm font-medium text-text-dark mb-1.5">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_register"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`${inputBaseClass} ${password && confirmPassword && password !== confirmPassword ? '!border-error focus:!ring-error' : 'focus:ring-primary'}`}
              placeholder="Re-type your password"
            />
             {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-error mt-1.5">Passwords do not match.</p>
            )}
          </div>
          {localError && !authError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">{localError}</p>}
          {authError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">{authError}</p>}
          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full bg-accent hover:bg-accent-dark text-primary font-semibold py-3.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-accent/60 focus:ring-offset-2"
          >
             {isLoading || authLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
                </>
            ) : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-text-light pt-4 border-t border-neutral-light">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-secondary transition-colors">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegisterPage;