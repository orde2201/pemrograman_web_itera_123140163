// src/context/BookContext.js
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage("books", []);

  const addBook = useCallback(
    (payload) => {
      const newBook = {
        id: Date.now().toString(),
        title: payload.title || "Untitled",
        author: payload.author || "Unknown",
        year: payload.year || "",
        status: payload.status || "milik",
        createdAt: new Date().toISOString(),
      };
      setBooks((prev) => [...prev, newBook]);
    },
    [setBooks],
  );

  const updateBook = useCallback(
    (id, updatedFields) => {
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b)),
      );
    },
    [setBooks],
  );

  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    },
    [setBooks],
  );

  const value = useMemo(
    () => ({
      books,
      addBook,
      updateBook,
      deleteBook,
      setBooks,
    }),
    [books, addBook, updateBook, deleteBook, setBooks],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used inside BookProvider");
  return ctx;
};
