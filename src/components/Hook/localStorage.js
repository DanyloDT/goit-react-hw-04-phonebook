import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    let currentValue = initialValue;

    try {
      currentValue =
        JSON.parse(window.localStorage.getItem(key)) || initialValue;
    } catch (error) {
      currentValue = initialValue;
    }

    return currentValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  });

  return [state, setState];
};
