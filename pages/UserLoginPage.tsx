import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../constants';

const LoginIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);


const UserLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, currentUser, loading: authLoading, error: authError, clearError } = useAuth();

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/my-account';

  React.useEffect(() => {
    clearError();
    if (currentUser) { 
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, navigate, redirectPath, clearError]);

  const inputBaseClass = "w-full p-3 border border-neutral-darkest/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
    } catch (err: any) {
      console.error("Login attempt failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-light to-neutral-lightest">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 space-y-8 border-t-4 border-primary">
        <div className="text-center">
            <LoginIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Welcome Back!</h1>
            <p className="text-text-light">Log in to continue your adventure with {APP_NAME}.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email_user" className="block text-sm font-medium text-text-dark mb-1.5">Email Address</label>
            <input
              type="email"
              id="email_user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputBaseClass}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password_user" className="block text-sm font-medium text-text-dark mb-1.5">Password</label>
            <input
              type="password"
              id="password_user" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputBaseClass}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          {authError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">{authError}</p>}
          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2"
          >
            {isLoading || authLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
                </>
            ) : "Login"}
          </button>
        </form>
        <div className="text-center text-sm text-text-light space-y-2 pt-4 border-t border-neutral-light">
            <p>
                Don't have an account? <Link to="/register" className="font-medium text-primary hover:text-secondary transition-colors">Register here</Link>
            </p>
            <p>
                Are you an admin? <Link to="/admin/login" className="font-medium text-accent hover:text-accent-dark transition-colors">Admin Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;