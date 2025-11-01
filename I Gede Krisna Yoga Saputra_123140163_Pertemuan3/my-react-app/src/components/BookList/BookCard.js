import React, { useState } from "react";
import { Edit2, Trash2, Book, BookOpen, ShoppingCart } from "lucide-react";
import { useBooks } from "../../context/BookContext";
import { BookForm } from "../BookForm/BookForm";

export const BookCard = ({ book }) => {
  const { deleteBook } = useBooks();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const statusConfig = {
    milik: {
      icon: Book,
      text: "Dimiliki",
      color: "bg-green-100 text-green-700 border-green-300",
    },
    baca: {
      icon: BookOpen,
      text: "Sedang Dibaca",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    beli: {
      icon: ShoppingCart,
      text: "Ingin Dibeli",
      color: "bg-orange-100 text-orange-700 border-orange-300",
    },
  };

  const config = statusConfig[book.status] || statusConfig["milik"];
  const StatusIcon = config.icon;

  const handleDelete = () => {
    deleteBook(book.id);
    setShowDelete(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm">oleh {book.author}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEdit(true)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
              aria-label="Edit buku"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
              aria-label="Hapus buku"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
        >
          <StatusIcon size={14} />
          {config.text}
        </div>
      </div>

      {showEdit && (
        <BookForm onClose={() => setShowEdit(false)} editBook={book} />
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Hapus Buku</h3>
            <p className="text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus "<strong>{book.title}</strong>"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
