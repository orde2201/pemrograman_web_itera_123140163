// src/pages/Stats/StatsPage.js
import React from "react";
import { useBooks } from "../../context/BookContext";
import { useBookStats } from "../../hooks/useBookStats";

export const StatsPage = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Statistik Buku</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm">Total Buku</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm">Sudah Dimiliki</p>
          <h2 className="text-2xl font-bold">{stats.owned}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm">Sedang Dibaca</p>
          <h2 className="text-2xl font-bold">{stats.reading}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm">Ingin Dibeli</p>
          <h2 className="text-2xl font-bold">{stats.wishlist}</h2>
        </div>
      </div>
    </div>
  );
};
