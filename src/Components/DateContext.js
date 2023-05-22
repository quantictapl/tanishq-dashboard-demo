import React, { createContext, useState } from 'react';

// Create the context
const DateContext = createContext();

// Create a provider component
const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DateContext.Provider value={selectedDate}>
      {children}
    </DateContext.Provider>
  );
};

export { DateContext, DateProvider };