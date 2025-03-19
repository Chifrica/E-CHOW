import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({
    name: 'General (Current location)',
    description: 'Rosebud, Oke lla, Ado Ekiti',
  });

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);