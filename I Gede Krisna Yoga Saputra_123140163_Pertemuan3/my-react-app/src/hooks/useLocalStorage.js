// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.error("useLocalStorage read error:", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("useLocalStorage write error:", e);
    }
  }, [key, state]);

  return [state, setState];
};
