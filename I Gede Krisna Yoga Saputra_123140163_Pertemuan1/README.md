# 📚 Aplikasi Manajemen Tugas Mahasiswa

> Aplikasi web sederhana berbasis HTML, CSS, dan JavaScript untuk membantu mahasiswa mengelola tugas-tugas akademik dengan efisien dan terorganisir.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📖 Daftar Isi

- [Tentang Aplikasi](#-tentang-aplikasi)
- [Fitur-Fitur](#-fitur-fitur)
- [Screenshot Aplikasi](#-screenshot-aplikasi)
- [Cara Menjalankan Aplikasi](#-cara-menjalankan-aplikasi)
- [Penjelasan Teknis](#-penjelasan-teknis)
- [Struktur Project](#-struktur-project)
- [Browser yang Didukung](#-browser-yang-didukung)
- [FAQ](#-faq)

---

## 🎯 Tentang Aplikasi

**Aplikasi Manajemen Tugas Mahasiswa** adalah aplikasi web yang dirancang khusus untuk membantu mahasiswa dalam:

- ✅ Mencatat semua tugas kuliah dengan terstruktur
- ✅ Mengatur deadline dan prioritas tugas
- ✅ Melacak progress penyelesaian tugas
- ✅ Menyimpan data secara permanen tanpa perlu server
- ✅ Mencari dan memfilter tugas dengan mudah

Aplikasi ini menggunakan **localStorage** untuk menyimpan data langsung di browser, sehingga:
- Tidak memerlukan koneksi internet
- Data tersimpan permanen (tidak hilang saat browser ditutup)
- Tidak memerlukan registrasi atau login
- Gratis dan mudah digunakan

---

## ✨ Fitur-Fitur

### 1. **Manajemen Tugas Lengkap (CRUD)** 📝

| Fitur | Deskripsi |
|-------|-----------|
| ➕ **Create** | Tambah tugas baru dengan informasi nama tugas, mata kuliah, dan deadline |
| 👁️ **Read** | Tampilkan semua tugas dalam bentuk card yang informatif |
| ✏️ **Update** | Edit informasi tugas yang sudah ada |
| 🗑️ **Delete** | Hapus tugas dengan konfirmasi untuk menghindari kesalahan |

### 2. **Validasi Form Otomatis** ✅

Sistem validasi yang memastikan data valid sebelum disimpan:

- **Nama Tugas**: Tidak boleh kosong
- **Mata Kuliah**: Wajib diisi
- **Deadline**: Harus tanggal yang valid dan tidak boleh tanggal yang sudah lewat
- **Error Handling**: Menampilkan pesan error yang jelas untuk setiap field yang tidak valid

### 3. **Penyimpanan Data Permanen** 💾

- Menggunakan **localStorage** browser
- Data tersimpan meskipun browser ditutup
- Auto-save setiap kali ada perubahan
- Kapasitas hingga 5-10 MB

### 4. **Filter dan Pencarian Real-time** 🔍

**Filter Berdasarkan Status:**
- Semua tugas
- Tugas belum selesai
- Tugas yang sudah selesai

**Pencarian:**
- Search box untuk mencari tugas
- Pencarian berdasarkan nama tugas atau mata kuliah
- Real-time filtering (hasil langsung muncul saat mengetik)

### 5. **Dashboard Statistik** 📊

Menampilkan informasi penting:
- Total jumlah tugas
- Jumlah tugas yang belum selesai
- Jumlah tugas yang sudah diselesaikan
- Update otomatis setiap ada perubahan

### 6. **Fitur Tambahan** ⭐

- ✅ **Toggle Status**: Tandai tugas sebagai selesai/belum selesai dengan satu klik
- ✅ **Deadline Alert**: Indikator visual untuk tugas dengan deadline mendesak (≤ 3 hari)
- ✅ **Format Tanggal Indonesia**: Tanggal ditampilkan dalam format bahasa Indonesia
- ✅ **Desain Minimalist**: UI yang bersih, sederhana, dan mudah digunakan
- ✅ **Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- ✅ **Empty State**: Pesan informatif saat belum ada tugas

---

## 📸 Screenshot Aplikasi

### 1. Halaman Utama dengan Dashboard Statistik
```
┌─────────────────────────────────────────────┐
│     Manajemen Tugas Mahasiswa               │
│     Kelola tugas akademik Anda              │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Total │  │Belum │  │Selesai│             │
│  │  5   │  │  3   │  │  2   │              │
│  └──────┘  └──────┘  └──────┘              │
└─────────────────────────────────────────────┘
```
*Dashboard menampilkan statistik tugas secara real-time*

### 2. Form Tambah/Edit Tugas dengan Validasi
```
┌─────────────────────────────────────────────┐
│  Tambah Tugas                               │
├─────────────────────────────────────────────┤
│  Nama Tugas *                               │
│  [Essay Filsafat Pendidikan_______]         │
│                                             │
│  Mata Kuliah *                              │
│  [Pemrograman Web_________________]         │
│                                             │
│  Deadline *                                 │
│  [30/10/2024]                              │
│                                             │
│  [Simpan]  [Batal]                         │
└─────────────────────────────────────────────┘
```
*Form input dengan validasi real-time untuk setiap field*

### 3. Daftar Tugas dengan Filter dan Pencarian
```
┌─────────────────────────────────────────────┐
│  [Cari tugas...___________] 🔍             │
│  [Semua] [Belum] [Selesai]                 │
├─────────────────────────────────────────────┤
│  ☐ Essay Filsafat Pendidikan      ✏️ 🗑️   │
│     Pemrograman Web | 30 Okt 2024 ⚠️      │
├─────────────────────────────────────────────┤
│  ☑ Tugas Algoritma Sorting        ✏️ 🗑️   │
│     Struktur Data | 15 Okt 2024           │
├─────────────────────────────────────────────┤
│  ☐ Laporan Praktikum Database    ✏️ 🗑️    │
│     Basis Data | 5 Nov 2024               │
└─────────────────────────────────────────────┘
```
*Daftar tugas dengan filter status dan fitur pencarian*

### 4. Validasi Form - Error State
```
┌─────────────────────────────────────────────┐
│  Tambah Tugas                               │
├─────────────────────────────────────────────┤
│  Nama Tugas *                               │
│  [________________________] ← border merah  │
│  ❌ Nama tugas wajib diisi                  │
│                                             │
│  Mata Kuliah *                              │
│  [________________________] ← border merah  │
│  ❌ Mata kuliah wajib diisi                 │
│                                             │
│  Deadline *                                 │
│  [15/10/2024____________] ← border merah    │
│  ❌ Deadline tidak boleh tanggal lewat      │
└─────────────────────────────────────────────┘
```
*Validasi menampilkan error message yang jelas*

### 5. Deadline Alert (Tugas Mendesak)
```
┌─────────────────────────────────────────────┐
│  ☐ Submit Proposal Skripsi        ✏️ 🗑️   │
│     Metodologi Penelitian                   │
│     📅 19 Okt 2024 ⚠️  ← Warning merah     │
└─────────────────────────────────────────────┘
```
*Alert visual untuk tugas dengan deadline ≤ 3 hari*

---

## 🚀 Cara Menjalankan Aplikasi

### Metode 1: Download dan Jalankan Langsung

#### Langkah 1: Download File
Download atau salin ketiga file berikut:
- `index.html`
- `style.css`
- `script.js`

#### Langkah 2: Simpan dalam Satu Folder
```
my-task-app/
├── index.html
├── style.css
└── script.js
```

#### Langkah 3: Aktifkan localStorage
Buka file `script.js` dan **uncomment** (hapus `//` di awal) 4 baris berikut:

**Baris 9:**
```javascript
// Hapus // di baris ini
tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```

**Baris 159:**
```javascript
// Hapus // di baris ini
localStorage.setItem('tasks', JSON.stringify(tasks));
```

**Baris 177:**
```javascript
// Hapus // di baris ini
localStorage.setItem('tasks', JSON.stringify(tasks));
```

**Baris 187:**
```javascript
// Hapus // di baris ini
localStorage.setItem('tasks', JSON.stringify(tasks));
```

#### Langkah 4: Jalankan Aplikasi
- **Cara 1**: Double-click file `index.html`
- **Cara 2**: Klik kanan `index.html` → Open with → Pilih browser
- **Cara 3**: Drag file `index.html` ke browser

#### Langkah 5: Mulai Gunakan! 🎉
Aplikasi siap digunakan dan data akan tersimpan permanen.

---

### Metode 2: Menggunakan Live Server (untuk Development)

Jika Anda menggunakan VS Code:

1. Install extension "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Aplikasi akan terbuka di `http://localhost:5500`

---

## 🔧 Penjelasan Teknis

### 1. localStorage Implementation

#### Apa itu localStorage?
localStorage adalah API browser yang memungkinkan penyimpanan data key-value secara permanen di browser pengguna.

#### Cara Kerja di Aplikasi:

**a) Struktur Data**
```javascript
// Data disimpan dalam format JSON
{
  "id": 1729123456789,           // Timestamp sebagai unique ID
  "nama": "Essay Filsafat",      // Nama tugas
  "mataKuliah": "Pemrograman Web", // Mata kuliah
  "deadline": "2024-10-30",      // Format YYYY-MM-DD
  "selesai": false,              // Status boolean
  "tanggalDibuat": "2024-10-16T10:30:00.000Z" // ISO timestamp
}
```

**b) Menyimpan Data (Save)**
```javascript
// Convert array JavaScript ke JSON string
localStorage.setItem('tasks', JSON.stringify(tasks));

// Penjelasan:
// - tasks: array JavaScript berisi object tugas
// - JSON.stringify(): convert array menjadi text JSON
// - localStorage hanya bisa simpan text, tidak bisa simpan object/array langsung
```

**c) Mengambil Data (Load)**
```javascript
// Ambil JSON string dari localStorage dan convert ke array
tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Penjelasan:
// - localStorage.getItem(): ambil text JSON dari storage
// - JSON.parse(): convert text JSON kembali ke array JavaScript
// - || []: jika null (belum ada data), gunakan array kosong
```

**d) Kapan Data Disimpan**
```javascript
// 1. Saat menambah tugas baru
function handleSubmit() {
    // ... proses tambah tugas
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 2. Saat mengedit tugas
function editTask(id) {
    // ... proses edit
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. Saat menghapus tugas
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 4. Saat toggle status selesai
function toggleComplete(id) {
    task.selesai = !task.selesai;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
```

**e) Load Data Saat Aplikasi Dibuka**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Load data dari localStorage
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render ke UI
    renderTasks();
    updateStats();
});
```

#### Keuntungan localStorage:
- ✅ Data persisten (tidak hilang saat browser ditutup)
- ✅ Tidak perlu server atau database
- ✅ Tidak perlu koneksi internet
- ✅ Cepat dan mudah digunakan
- ✅ Kapasitas 5-10 MB (cukup untuk ribuan tugas)

#### Limitasi localStorage:
- ❌ Data hanya tersimpan di browser yang sama
- ❌ Data hilang jika clear browser data
- ❌ Tidak bisa diakses dari device lain
- ❌ Tidak ada enkripsi (jangan simpan data sensitif)

---

### 2. Validasi Form Implementation

#### Tujuan Validasi:
- Memastikan data yang masuk valid dan lengkap
- Mencegah error saat pemrosesan data
- Memberikan feedback yang jelas kepada user
- Meningkatkan user experience

#### Proses Validasi:

**a) Struktur Validasi**
```javascript
function validateForm() {
    clearErrors();        // Hapus error sebelumnya
    let isValid = true;   // Flag validasi
    
    // Ambil nilai dari form
    const name = document.getElementById('taskName').value.trim();
    const course = document.getElementById('taskCourse').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    
    // Validasi setiap field
    // ... (lihat detail di bawah)
    
    return isValid;  // Return true jika semua valid
}
```

**b) Validasi Nama Tugas**
```javascript
// Cek apakah nama tugas kosong
if (!name) {
    // Tambah class error pada input (border merah)
    document.getElementById('taskName').classList.add('error');
    
    // Tampilkan pesan error
    document.getElementById('errorName').classList.add('show');
    
    // Set flag validasi ke false
    isValid = false;
}

// Logika:
// - trim() menghapus spasi di awal dan akhir
// - !name bernilai true jika string kosong
```

**c) Validasi Mata Kuliah**
```javascript
// Sama seperti validasi nama
if (!course) {
    document.getElementById('taskCourse').classList.add('error');
    document.getElementById('errorCourse').classList.add('show');
    isValid = false;
}
```

**d) Validasi Deadline**
```javascript
// Cek 1: Apakah deadline diisi?
if (!deadline) {
    document.getElementById('taskDeadline').classList.add('error');
    document.getElementById('errorDeadline').classList.add('show');
    isValid = false;
} else {
    // Cek 2: Apakah deadline bukan tanggal yang sudah lewat?
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Reset jam ke 00:00:00
    
    if (selectedDate < today) {
        document.getElementById('taskDeadline').classList.add('error');
        document.getElementById('errorDeadline').classList.add('show');
        document.getElementById('errorDeadline').textContent = 
            'Deadline tidak boleh tanggal yang sudah lewat';
        isValid = false;
    }
}

// Logika:
// - new Date(deadline) convert string ke object Date
// - selectedDate < today membandingkan tanggal
// - setHours(0,0,0,0) memastikan perbandingan hanya tanggal, bukan waktu
```

**e) Clear Error State**
```javascript
function clearErrors() {
    // Hapus semua pesan error
    document.querySelectorAll('.error-msg').forEach(msg => {
        msg.classList.remove('show');
    });
    
    // Hapus border merah dari semua input
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('error');
    });
}

// Dipanggil saat:
// - User mulai validasi baru
// - User submit form
// - User cancel form
```

**f) Mencegah Submit Jika Tidak Valid**
```javascript
function handleSubmit() {
    // Jalankan validasi
    if (!validateForm()) {
        return;  // Stop eksekusi jika validasi gagal
    }
    
    // Lanjut proses simpan data jika validasi berhasil
    // ...
}
```

#### CSS untuk Error State:
```css
/* Input dengan error */
.form-group input.error {
    border-color: #e53e3e;  /* Border merah */
}

/* Pesan error (default hidden) */
.error-msg {
    display: none;
    font-size: 12px;
    color: #e53e3e;
    margin-top: 6px;
}

/* Tampilkan pesan error */
.error-msg.show {
    display: block;
}
```

#### Flow Validasi Lengkap:
```
User klik "Simpan"
    ↓
Panggil validateForm()
    ↓
Clear error sebelumnya
    ↓
Cek nama tugas → Kosong? → Tampilkan error
    ↓
Cek mata kuliah → Kosong? → Tampilkan error
    ↓
Cek deadline → Kosong atau lewat? → Tampilkan error
    ↓
Semua valid? → Return true → Simpan data
Tidak valid? → Return false → Stop, tampilkan error
```

---

## 📁 Struktur Project

```
aplikasi-manajemen-tugas/
│
├── index.html          # Struktur HTML (layout & markup)
├── style.css           # Styling (desain minimalist)
└── script.js           # Logika JavaScript (CRUD, validasi, localStorage)
```

### Detail File:

#### 1. index.html (300 baris)
- Header dan title aplikasi
- Dashboard statistik (3 card)
- Search box dan filter buttons
- Form input tugas (hidden by default)
- Container untuk daftar tugas
- Catatan tentang localStorage

#### 2. style.css (450 baris)
- Reset CSS dan base styling
- Responsive grid layout
- Komponen card, button, form
- State styling (active, error, completed)
- Media queries untuk mobile
- Minimalist color scheme (monochrome)

#### 3. script.js (250 baris)
- Data storage dengan array
- CRUD operations (5 functions)
- Validasi form (3 validators)
- Filter & search logic
- Render & update UI
- localStorage integration
- Utility functions (format date, check deadline)

---

## 🌐 Browser yang Didukung

Aplikasi ini kompatibel dengan browser modern yang mendukung localStorage:

| Browser | Versi Minimum | Status |
|---------|---------------|--------|
| Chrome | 4+ | ✅ Fully Supported |
| Firefox | 3.5+ | ✅ Fully Supported |
| Safari | 4+ | ✅ Fully Supported |
| Edge | 12+ | ✅ Fully Supported |
| Opera | 10.5+ | ✅ Fully Supported |

**Catatan:** Internet Explorer 7 dan di bawahnya tidak didukung karena tidak memiliki localStorage API.

---

## ❓ FAQ (Frequently Asked Questions)

### Q1: Apakah data saya aman?
**A:** Data tersimpan di browser Anda sendiri menggunakan localStorage. Data tidak dikirim ke server manapun, jadi privasi terjaga. Namun, data tidak terenkripsi, jadi jangan simpan informasi sensitif.

### Q2: Apakah data bisa diakses dari komputer/HP lain?
**A:** Tidak. localStorage hanya tersimpan di browser yang Anda gunakan. Untuk akses dari device lain, Anda perlu sistem sync dengan server (di luar scope aplikasi ini).

### Q3: Bagaimana jika saya clear browser data?
**A:** Data akan hilang. Untuk backup, Anda bisa:
1. Buka DevTools (F12) → Application → Local Storage
2. Copy value dari key "tasks"
3. Simpan di notepad sebagai backup
4. Restore dengan paste kembali ke localStorage

### Q4: Apakah bisa export data ke Excel/PDF?
**A:** Fitur ini tidak tersedia di versi saat ini. Namun Anda bisa menambahkan fungsi export dengan library seperti SheetJS (untuk Excel) atau jsPDF (untuk PDF).

### Q5: Kenapa deadline tidak bisa pilih tanggal yang sudah lewat?
**A:** Ini adalah validasi untuk mencegah kesalahan input. Deadline seharusnya adalah tanggal di masa depan. Jika Anda perlu mencatat tugas yang sudah lewat deadline, Anda bisa tandai sebagai "selesai" terlebih dahulu.

### Q6: Apakah aplikasi perlu internet?
**A:** Tidak. Setelah file HTML, CSS, dan JS ada di komputer Anda, aplikasi bisa berjalan 100% offline.

### Q7: Berapa banyak tugas yang bisa disimpan?
**A:** localStorage memiliki limit sekitar 5-10 MB. Ini cukup untuk menyimpan ribuan tugas. Rata-rata 1 tugas = ~200 bytes, jadi bisa menyimpan 25,000+ tugas.

---

## 📝 Lisensi

Project ini dibuat untuk keperluan tugas praktikum dan pembelajaran. Bebas digunakan dan dimodifikasi sesuai kebutuhan.

---

## 👨‍💻 Dibuat Oleh

**Tugas Praktikum - Pemrograman Web**

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.

---

**Happy Coding! 🚀**
