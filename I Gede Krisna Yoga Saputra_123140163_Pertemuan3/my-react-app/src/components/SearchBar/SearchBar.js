// src/components/SearchBar/SearchBar.js
import React from "react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari..."
        className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};
