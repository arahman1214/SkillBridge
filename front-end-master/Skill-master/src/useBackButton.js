import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useBackButton = (handler) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes to the current location.
    const unlisten = navigate.listen((newLocation) => {
      if (newLocation.action === 'POP') {
        handler();
      }
    });

    // Cleanup the listener on unmount
    return () => unlisten();
  }, [location, navigate, handler]);
};
