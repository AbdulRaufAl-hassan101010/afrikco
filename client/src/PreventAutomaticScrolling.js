import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PreventAutomaticScrolling = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on each route change
  }, [location.pathname]);
  return <>{children}</>;
};

export default PreventAutomaticScrolling;
