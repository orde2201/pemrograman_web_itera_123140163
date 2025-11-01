import React from "react";
import { BookCard } from "./BookCard";

export const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <p className="text-gray-500 mt-4">Tidak ada buku untuk ditampilkan.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
