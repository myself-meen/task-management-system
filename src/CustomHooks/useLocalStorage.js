import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Initialize state lazily (using an arrow function so it only runs once on load)
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    
    // If we found something in local storage, parse it and use it!
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    // Otherwise, fallback to the initial dummy data provided
    return initialValue;
  });

  // 2. Whenever the 'key' or 'value' changes, update localStorage automatically
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}