import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { onAuthChange, getCurrentUser } from '../../config/firebase';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage first for a quicker auth check
    const sessionAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (sessionAuth) {
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // If no session, check Firebase auth state
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('adminAuthenticated');
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        flexDirection: 'column',
        gap: 2,
      }}>
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return children;
};

export default ProtectedRoute; 