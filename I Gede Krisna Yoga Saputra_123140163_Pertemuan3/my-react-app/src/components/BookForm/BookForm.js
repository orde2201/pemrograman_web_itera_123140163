// src/components/BookForm/BookForm.js
import React, { useEffect, useState } from "react";

export const BookForm = ({
  editBook = null,
  onClose = () => { },
  onSubmit = () => { },
}) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    status: "milik",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editBook) {
      setForm({
        title: editBook.title || "",
        author: editBook.author || "",
        year: editBook.year || "",
        status: editBook.status || "milik",
      });
      setErrors({});
    } else {
      setForm({ title: "", author: "", year: "", status: "milik" });
    }
  }, [editBook]);

  const validate = () => {
    const e = {};
    if (!form.title || !form.title.trim()) e.title = "Judul wajib diisi";
    if (!form.author || !form.author.trim()) e.author = "Penulis wajib diisi";
    if (form.year && !/^\d{3,4}$/.test(String(form.year)))
      e.year = "Tahun tidak valid";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    // jika editBook diberikan, panggil onSubmit dengan id-aware payload
    if (editBook) {
      onSubmit({ id: editBook.id, ...form });
    } else {
      onSubmit({ ...form });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Judul</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.title ? "border-red-500" : "border-gray-300"}`}
          required
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Penulis
        </label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.author ? "border-red-500" : "border-gray-300"}`}
          required
        />
        {errors.author && (
          <p className="text-xs text-red-500 mt-1">{errors.author}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tahun</label>
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.year ? "border-red-500" : "border-gray-300"}`}
          placeholder="Opsional"
        />
        {errors.year && (
          <p className="text-xs text-red-500 mt-1">{errors.year}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {editBook ? "Simpan" : "Tambah"}
        </button>
      </div>
    </form>
  );
};
