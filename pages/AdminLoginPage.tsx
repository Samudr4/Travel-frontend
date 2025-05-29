import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../constants';

const ShieldLockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.602-3.751A11.959 11.959 0 0 1 12 2.75c-2.078 0-4.035.624-5.682 1.697M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </svg>
);


const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser, isAdmin, currentUser, loading: authLoading, error: authError, clearError } = useAuth(); 

  React.useEffect(() => {
    clearError();
    if (currentUser && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, isAdmin, navigate, clearError]);

  const inputBaseClass = "w-full p-3 border border-neutral-darkest/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
    } catch (err: any) {
      console.error("Admin login attempt failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const notAdminError = currentUser && !isAdmin && !authLoading && !authError;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-light to-neutral-lightest">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 space-y-8 border-t-4 border-primary">
        <div className="text-center">
            <ShieldLockIcon className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-primary mb-2">Admin Panel Login</h1>
          <p className="text-text-light">Access the {APP_NAME} control center.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email_admin" className="block text-sm font-medium text-text-dark mb-1.5">Admin Email</label>
            <input
              type="email"
              id="email_admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputBaseClass}
              autoComplete="email"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password_admin" className="block text-sm font-medium text-text-dark mb-1.5">Password</label>
            <input
              type="password"
              id="password_admin" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputBaseClass}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          {authError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">{authError}</p>}
          {notAdminError && <p className="text-error text-sm text-center p-3 bg-error-light rounded-md border border-error/30">Access Denied: You are not authorized to access the admin panel.</p>}
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
            ) : "Login to Admin Panel"}
          </button>
        </form>
         <p className="text-center text-sm text-text-light pt-4 border-t border-neutral-light">
            Not an admin? <Link to="/" className="font-medium text-primary hover:text-secondary transition-colors">Go to Homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;