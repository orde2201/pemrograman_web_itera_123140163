// src/components/BookList/BookFilter.js
import React from "react";

export const BookFilter = ({
  statusFilter,
  setStatusFilter,
  textFilter,
  setTextFilter,
}) => {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex gap-2">
        {["all", "milik", "baca", "beli"].map((v) => (
          <button
            key={v}
            onClick={() => setStatusFilter(v)}
            className={`px-3 py-1 rounded-lg ${statusFilter === v ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            {v === "all"
              ? "Semua"
              : v === "milik"
                ? "Dimiliki"
                : v === "baca"
                  ? "Dibaca"
                  : "Wishlist"}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={textFilter}
        onChange={(e) => setTextFilter(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );
};
