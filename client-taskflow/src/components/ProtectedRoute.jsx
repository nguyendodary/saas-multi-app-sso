import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LOGIN_URL } from '../api/axios';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-accent-indigo/30 border-t-accent-indigo rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary text-sm font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = `${LOGIN_URL}`;
    return null;
  }

  // Check roles if required
  if (requiredRoles.length > 0 && user) {
    const userRoles = user.roles?.map((r) => r.name) || [];
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
