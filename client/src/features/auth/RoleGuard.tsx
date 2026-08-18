import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import type { UserRole } from './types';

export interface RoleGuardProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="p-8 border border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 text-center m-6 font-mono">
        <h2 className="text-sm font-bold uppercase text-rose-600 dark:text-rose-400">403 // ACCESS DENIED</h2>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
          Role <span className="underline font-bold">{user.role}</span> is not authorized to view this operation.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
