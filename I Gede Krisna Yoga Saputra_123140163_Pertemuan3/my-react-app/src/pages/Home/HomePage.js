// src/pages/Home/HomePage.js
import React, { useMemo, useState } from "react";
import { useBooks } from "../../context/BookContext";
import { BookForm } from "../../components/BookForm/BookForm";
import { BookList } from "../../components/BookList/BookList";
import { BookFilter } from "../../components/BookList/BookFilter";

export const HomePage = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [statusFilter, setStatusFilter] = useState("all");
  const [textFilter, setTextFilter] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesStatus =
        statusFilter === "all" ? true : b.status === statusFilter;
      const q = textFilter.trim().toLowerCase();
      const matchesText =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      return matchesStatus && matchesText;
    });
  }, [books, statusFilter, textFilter]);

  const handleAddSubmit = (payload) => {
    addBook(payload);
    setShowAdd(false);
  };

  const handleEditSubmit = (payload) => {
    updateBook(payload.id, payload);
    setEditing(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Buku</h1>
        <div>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tambah Buku
          </button>
        </div>
      </div>

      <BookFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        textFilter={textFilter}
        setTextFilter={setTextFilter}
      />

      <BookList
        books={filtered}
        onEdit={(b) => setEditing(b)}
        onDelete={(id) => deleteBook(id)}
      />

      {/* Modal Tambah */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
            <BookForm
              onClose={() => setShowAdd(false)}
              onSubmit={handleAddSubmit}
            />
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Buku</h2>
            <BookForm
              editBook={editing}
              onClose={() => setEditing(null)}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
