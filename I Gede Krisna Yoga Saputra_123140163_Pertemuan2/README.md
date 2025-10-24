Personal Dashboard Sederhana

Sebuah aplikasi web front-end sederhana yang berfungsi sebagai dasbor pribadi untuk mengelola daftar tugas (to-do list) dan jadwal kuliah. Aplikasi ini dibuat murni menggunakan HTML, CSS, dan JavaScript modern (ES6+) tanpa framework atau library eksternal.

Seluruh data disimpan secara lokal di browser pengguna menggunakan LocalStorage, sehingga data tidak akan hilang saat halaman dimuat ulang.

Tampilan Aplikasi

Berikut adalah tangkapan layar (screenshot) dari aplikasi yang sudah jadi:

Fitur Utama 🚀

    Manajemen Tugas:

        Menambah tugas baru dengan judul, deskripsi, dan tanggal deadline.

        Menandai tugas sebagai "selesai".

        Mengedit detail tugas yang sudah ada.

        Menghapus tugas.

    Manajemen Jadwal:

        Menambah jadwal kuliah baru dengan nama mata kuliah, hari, waktu, dan ruang.

        Mengedit detail jadwal.

        Menghapus jadwal.

    Navigasi Tab: Antarmuka dengan dua tab untuk beralih antara tampilan Tugas dan Jadwal dengan mudah.

    Penyimpanan Lokal: Semua data tugas dan jadwal akan tetap tersimpan di browser, bahkan setelah browser ditutup.

    Desain Minimalis: Tampilan yang bersih dan sederhana agar fokus pada fungsionalitas.

Implementasi Fitur JavaScript (ES6+) 🤓

Aplikasi ini dibangun dengan memanfaatkan fitur-fitur modern dari JavaScript (ES6 dan versi setelahnya) untuk membuat kode yang lebih bersih, efisien, dan mudah dibaca. Berikut adalah daftar fitur yang diimplementasikan:

    let dan const

        const digunakan untuk mendeklarasikan variabel yang nilainya tidak akan diubah lagi, seperti elemen-elemen HTML yang diambil dari DOM dan object Penyimpanan.

        let digunakan untuk variabel yang nilainya dapat berubah seiring berjalannya aplikasi, seperti semuaTugas, tabAktif, dan idYangDiedit.

    Arrow Functions (=>)

        Digunakan secara ekstensif untuk menulis fungsi callback pada event listener agar lebih ringkas. Contohnya pada forEach untuk tombol tab dan pada event listener untuk form submit.
    JavaScript

semuaTombolTab.forEach(tombol => {
    tombol.addEventListener('click', () => {
        // ... logika
    });
});

Template Literals (String `)

    Digunakan untuk membuat blok HTML secara dinamis pada fungsi renderTugas() dan renderJadwal(). Fitur ini memungkinkan penyisipan variabel dan logika sederhana langsung di dalam string, membuat proses rendering menjadi jauh lebih bersih daripada metode penggabungan string manual (+).

JavaScript

const tugasHTML = semuaTugas.map(tugas => `
    <div class="item ${tugas.selesai ? 'completed' : ''}" data-id="${tugas.id}">
        <div class="item-title">${tugas.judul}</div>
    </div>
`).join('');

Classes

    Aplikasi ini menggunakan class untuk membuat blueprint atau cetakan bagi object data, sehingga struktur data menjadi lebih terorganisir dan konsisten.

        class Tugas: Mendefinisikan struktur untuk setiap item tugas.

        class Jadwal: Mendefinisikan struktur untuk setiap item jadwal.

        class Penyimpanan: Mengelola semua logika yang berhubungan dengan LocalStorage (menyimpan dan mengambil data).

Async/Await

    Digunakan pada class Penyimpanan dan pada fungsi-fungsi yang berinteraksi dengannya. Meskipun LocalStorage bersifat sinkron, async/await digunakan untuk mensimulasikan bagaimana data akan diambil jika berasal dari sumber eksternal (seperti API), dan ini adalah praktik terbaik (best practice) dalam pengembangan aplikasi modern.

JavaScript

    const init = async () => {
        // 'await' membuat kode menunggu sampai data selesai diambil
        semuaTugas = await penyimpananTugas.ambil();
        semuaJadwal = await penyimpananJadwal.ambil();
        render();
    };

Cara Menjalankan

Tidak ada proses instalasi yang rumit. Cukup buka file index.html langsung di browser web modern pilihan Anda (seperti Google Chrome, Firefox, atau Edge).
