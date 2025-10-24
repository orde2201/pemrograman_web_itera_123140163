document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // BAGIAN 1: BLUEPRINT (CLASSES)
  // ===================================
  // Class adalah blueprint untuk membuat object.
  // buat blueprint untuk 'Tugas', 'Jadwal', dan 'Penyimpanan'.

  class Tugas {
    constructor(id, judul, deskripsi, deadline, selesai = false) {
      this.id = id;
      this.judul = judul;
      this.deskripsi = deskripsi;
      this.deadline = deadline;
      this.selesai = selesai;
    }
  }

  class Jadwal {
    constructor(id, matkul, waktu, ruang, hari) {
      this.id = id;
      this.matkul = matkul;
      this.waktu = waktu;
      this.ruang = ruang;
      this.hari = hari;
    }
  }

  // Class ini khusus untuk mengurus simpan dan ambil data dari Local Storage.
  // pakai 'async' untuk membuatnya seolah-olah butuh waktu, seperti mengambil data dari internet.
  class Penyimpanan {
    constructor(kunci) {
      this.kunci = kunci; // 'kunci' ini seperti nama file di Local Storage
    }

    // Fungsi untuk menyimpan data
    async simpan(data) {
      const dataString = JSON.stringify(data);
      localStorage.setItem(this.kunci, dataString);
    }

    // Fungsi untuk mengambil data
    async ambil() {
      const dataString = localStorage.getItem(this.kunci);
      // Jika ada data, ubah dari string kembali jadi object/array. Jika tidak, kembalikan array kosong.
      return dataString ? JSON.parse(dataString) : [];
    }
  }

  // ===================================
  // BAGIAN 2: PERSIAPAN & VARIABEL
  // ===================================

  // Siapkan object untuk menyimpan data tugas dan jadwal
  const penyimpananTugas = new Penyimpanan("data-tugas-saya");
  const penyimpananJadwal = new Penyimpanan("data-jadwal-saya");

  // 'const' digunakan untuk elemen HTML karena elemennya tidak akan pernah berubah.
  const listContainer = document.getElementById("list-container");
  const semuaTombolTab = document.querySelectorAll(".tab-button");
  const formTugas = document.getElementById("form-tugas");
  const formJadwal = document.getElementById("form-jadwal");

  // 'let' digunakan untuk variabel yang nilainya akan sering berubah.
  let semuaTugas = [];
  let semuaJadwal = [];
  let tabAktif = "tugas";
  let idYangDiedit = null;
  // ===================================
  // BAGIAN 3: FUNGSI-FUNGSI TAMPILAN (RENDER)
  // ===================================
  // Fungsi ini bertugas "menggambar" daftar tugas ke layar.

  const renderTugas = () => {
    // pakai .map() untuk mengubah setiap object tugas menjadi string HTML.
    const tugasHTML = semuaTugas
      .map((tugas) => {
        let deadlineHTML = "";
        if (tugas.deadline) {
          // Ubah format tanggal menjadi lebih mudah dibaca (misal: 24 Oktober 2025)
          const tanggal = new Date(tugas.deadline);
          const opsiFormat = { year: "numeric", month: "long", day: "numeric" };
          const tanggalFormatted = tanggal.toLocaleDateString(
            "id-ID",
            opsiFormat,
          );
          deadlineHTML = `<span>Batas Waktu: ${tanggalFormatted}</span>`;
        }

        // gabungkan semuanya di dalam template literal
        return `
                <div class="item ${tugas.selesai ? "completed" : ""}" data-id="${tugas.id}">
                    <div class="toggle-button ${tugas.selesai ? "completed" : ""}" data-action="toggle"></div>
                    <div class="item-content">
                        <div class="item-title">${tugas.judul}</div>
                        <div class="item-details">
                            <p>${tugas.deskripsi || ""}</p>
                            ${deadlineHTML} 
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="action-button" data-action="edit">Edit</button>
                        <button class="action-button" data-action="delete">Hapus</button>
                    </div>
                </div>
            `;
      })
      .join(""); // .join('') menggabungkan semua string HTML menjadi satu.

    // Template literal (string dengan backtick ``) memudahkan menggabungkan variabel dan HTML.
    listContainer.innerHTML = `
            <div class="list-header">
                <h2>Tugas Saya</h2>
                <button class="tombol-tambah" data-type="tugas">+</button>
            </div>
            ${tugasHTML}
        `;
  };

  // Fungsi ini bertugas "menggambar" daftar jadwal ke layar.
  const renderJadwal = () => {
    const jadwalHTML = semuaJadwal
      .map(
        (jadwal) => `
            <div class="item" data-id="${jadwal.id}">
                <div class="item-content">
                    <div class="item-title">${jadwal.matkul} (${jadwal.hari})</div>
                    <div class="item-details">Waktu: ${jadwal.waktu || "-"} | Ruang: ${jadwal.ruang || "-"}</div>
                </div>
                <div class="item-actions">
                    <button class="action-button" data-action="edit">Edit</button>
                    <button class="action-button" data-action="delete">Hapus</button>
                </div>
            </div>
        `,
      )
      .join("");

    listContainer.innerHTML = `
            <div class="list-header">
                <h2>Jadwal Saya</h2>
                <button class="tombol-tambah" data-type="jadwal">+</button>
            </div>
            ${jadwalHTML}
        `;
  };

  const render = () => {
    formTugas.classList.add("hidden");
    formJadwal.classList.add("hidden");

    if (tabAktif === "tugas") {
      renderTugas();
    } else {
      renderJadwal();
    }
  };

  // ===================================
  // BAGIAN 4: LOGIKA & AKSI PENGGUNA
  // ===================================

  const tampilkanForm = (tipe, item = null) => {
    idYangDiedit = item ? item.id : null;

    if (tipe === "tugas") {
      document.getElementById("form-tugas-judul").textContent = item
        ? "Edit Tugas"
        : "Tambah Tugas Baru";
      document.getElementById("input-tugas-judul").value = item
        ? item.judul
        : "";
      document.getElementById("input-tugas-deskripsi").value = item
        ? item.deskripsi
        : "";
      document.getElementById("input-tugas-deadline").value = item
        ? item.deadline
        : "";
      formTugas.classList.remove("hidden");
    } else {
      document.getElementById("form-jadwal-judul").textContent = item
        ? "Edit Jadwal"
        : "Tambah Jadwal Baru";
      document.getElementById("input-jadwal-matkul").value = item
        ? item.matkul
        : "";
      document.getElementById("input-jadwal-waktu").value = item
        ? item.waktu
        : "";
      document.getElementById("input-jadwal-ruang").value = item
        ? item.ruang
        : "";
      document.getElementById("input-jadwal-hari").value = item
        ? item.hari
        : "Senin";
      formJadwal.classList.remove("hidden");
    }
  };

  semuaTombolTab.forEach((tombol) => {
    tombol.addEventListener("click", () => {
      tabAktif = tombol.dataset.tab;
      semuaTombolTab.forEach((t) => t.classList.remove("active"));
      tombol.classList.add("active");
      render();
    });
  });

  formTugas.addEventListener("submit", async (event) => {
    event.preventDefault();
    const judul = document.getElementById("input-tugas-judul").value;

    if (idYangDiedit) {
      semuaTugas = semuaTugas.map((tugas) =>
        tugas.id === idYangDiedit
          ? new Tugas(
              idYangDiedit,
              judul,
              document.getElementById("input-tugas-deskripsi").value,
              document.getElementById("input-tugas-deadline").value,
              tugas.selesai,
            )
          : tugas,
      );
    } else {
      const tugasBaru = new Tugas(
        Date.now(),
        judul,
        document.getElementById("input-tugas-deskripsi").value,
        document.getElementById("input-tugas-deadline").value,
      );
      semuaTugas.push(tugasBaru);
    }

    await penyimpananTugas.simpan(semuaTugas);
    render();
  });

  formJadwal.addEventListener("submit", async (event) => {
    event.preventDefault();
    const matkul = document.getElementById("input-jadwal-matkul").value;

    if (idYangDiedit) {
      semuaJadwal = semuaJadwal.map((jadwal) =>
        jadwal.id === idYangDiedit
          ? new Jadwal(
              idYangDiedit,
              matkul,
              document.getElementById("input-jadwal-waktu").value,
              document.getElementById("input-jadwal-ruang").value,
              document.getElementById("input-jadwal-hari").value,
            )
          : jadwal,
      );
    } else {
      const jadwalBaru = new Jadwal(
        Date.now(),
        matkul,
        document.getElementById("input-jadwal-waktu").value,
        document.getElementById("input-jadwal-ruang").value,
        document.getElementById("input-jadwal-hari").value,
      );
      semuaJadwal.push(jadwalBaru);
    }

    await penyimpananJadwal.simpan(semuaJadwal);
    render();
  });

  document
    .getElementById("content")
    .addEventListener("click", async (event) => {
      const target = event.target;

      if (target.matches(".tombol-tambah")) {
        tampilkanForm(target.dataset.type);
      }
      if (target.matches(".tombol-batal")) {
        target.closest("form").classList.add("hidden");
      }

      const item = target.closest(".item");
      if (item) {
        const id = Number(item.dataset.id);
        const aksi = target.dataset.action;

        if (tabAktif === "tugas") {
          if (aksi === "toggle") {
            semuaTugas = semuaTugas.map((t) =>
              t.id === id ? { ...t, selesai: !t.selesai } : t,
            );
          } else if (aksi === "edit") {
            tampilkanForm(
              "tugas",
              semuaTugas.find((t) => t.id === id),
            );
            return;
          } else if (aksi === "delete") {
            semuaTugas = semuaTugas.filter((t) => t.id !== id);
          }
          await penyimpananTugas.simpan(semuaTugas);
        } else {
          if (aksi === "edit") {
            tampilkanForm(
              "jadwal",
              semuaJadwal.find((j) => j.id === id),
            );
            return;
          } else if (aksi === "delete") {
            semuaJadwal = semuaJadwal.filter((j) => j.id !== id);
          }
          await penyimpananJadwal.simpan(semuaJadwal);
        }
        render();
      }
    });

  // ===================================
  // BAGIAN 5: INISIALISASI APLIKASI
  // ===================================
  const init = async () => {
    semuaTugas = await penyimpananTugas.ambil();
    semuaJadwal = await penyimpananJadwal.ambil();
    render();
  };

  init();
});
