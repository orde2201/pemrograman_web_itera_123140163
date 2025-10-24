document.addEventListener("DOMContentLoaded", () => {
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
  class Penyimpanan {
    constructor(kunci) {
      this.kunci = kunci;
    }
    async simpan(data) {
      localStorage.setItem(this.kunci, JSON.stringify(data));
    }
    async ambil() {
      const dataString = localStorage.getItem(this.kunci);
      return dataString ? JSON.parse(dataString) : [];
    }
  }

  const penyimpananTugas = new Penyimpanan("data-tugas-saya-final");
  const penyimpananJadwal = new Penyimpanan("data-jadwal-saya-final");
  const listContainer = document.getElementById("list-container");
  const semuaTombolTab = document.querySelectorAll(".tab-button");
  const formTugas = document.getElementById("form-tugas");
  const formJadwal = document.getElementById("form-jadwal");

  let semuaTugas = [];
  let semuaJadwal = [];
  let tabAktif = "tugas";
  let idYangDiedit = null;

  const renderTugas = () => {
    const tugasHTML = semuaTugas
      .map((tugas) => {
        let deadlineHTML = "";
        if (tugas.deadline) {
          const tanggal = new Date(tugas.deadline);
          const opsiFormat = { year: "numeric", month: "long", day: "numeric" };
          const tanggalFormatted = tanggal.toLocaleDateString(
            "id-ID",
            opsiFormat,
          );
          deadlineHTML = `<span>Batas Waktu: ${tanggalFormatted}</span>`;
        }
        return `<div class="item ${tugas.selesai ? "completed" : ""}" data-id="${tugas.id}"><div class="toggle-button ${tugas.selesai ? "completed" : ""}" data-action="toggle"></div><div class="item-content"><div class="item-title">${tugas.judul}</div><div class="item-details"><p>${tugas.deskripsi || ""}</p>${deadlineHTML}</div></div><div class="item-actions"><button class="action-button" data-action="edit">Edit</button><button class="action-button" data-action="delete">Hapus</button></div></div>`;
      })
      .join("");
    listContainer.innerHTML = `<div class="list-header"><h2>Tugas Saya</h2><button class="tombol-tambah" data-type="tugas">+</button></div>${tugasHTML || '<p style="color: var(--warna-teks-halus);">Belum ada tugas.</p>'}`;
  };

  const renderJadwal = () => {
    const jadwalHTML = semuaJadwal
      .map(
        (jadwal) =>
          `<div class="item" data-id="${jadwal.id}"><div class="item-content"><div class="item-title">${jadwal.matkul} (${jadwal.hari})</div><div class="item-details">Waktu: ${jadwal.waktu || "-"} | Ruang: ${jadwal.ruang || "-"}</div></div><div class="item-actions"><button class="action-button" data-action="edit">Edit</button><button class="action-button" data-action="delete">Hapus</button></div></div>`,
      )
      .join("");
    listContainer.innerHTML = `<div class="list-header"><h2>Jadwal Saya</h2><button class="tombol-tambah" data-type="jadwal">+</button></div>${jadwalHTML || '<p style="color: var(--warna-teks-halus);">Belum ada jadwal.</p>'}`;
  };

  const render = () => {
    formTugas.classList.add("hidden");
    formJadwal.classList.add("hidden");
    if (tabAktif === "tugas") renderTugas();
    else renderJadwal();
  };

  const tampilkanForm = (tipe, item = null) => {
    idYangDiedit = item ? item.id : null;
    const isEdit = item !== null;
    if (tipe === "tugas") {
      const inputDeadline = formTugas.querySelector("#input-tugas-deadline");
      formTugas.querySelector("h3").textContent = isEdit
        ? "Edit Tugas"
        : "Tambah Tugas Baru";
      formTugas.querySelector("#input-tugas-judul").value = isEdit
        ? item.judul
        : "";
      formTugas.querySelector("#input-tugas-deskripsi").value = isEdit
        ? item.deskripsi
        : "";
      inputDeadline.value = isEdit ? item.deadline : "";
      // Baris ini memaksa input untuk tidak memiliki batasan tanggal minimum.
      inputDeadline.min = "";
      formTugas.classList.remove("hidden");
      formTugas.querySelector("#input-tugas-judul").focus();
    } else {
      formJadwal.querySelector("h3").textContent = isEdit
        ? "Edit Jadwal"
        : "Tambah Jadwal Baru";
      formJadwal.querySelector("#input-jadwal-matkul").value = isEdit
        ? item.matkul
        : "";
      formJadwal.querySelector("#input-jadwal-waktu").value = isEdit
        ? item.waktu
        : "";
      formJadwal.querySelector("#input-jadwal-ruang").value = isEdit
        ? item.ruang
        : "";
      formJadwal.querySelector("#input-jadwal-hari").value = isEdit
        ? item.hari
        : "Senin";
      formJadwal.classList.remove("hidden");
      formJadwal.querySelector("#input-jadwal-matkul").focus();
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
    const judul = formTugas.querySelector("#input-tugas-judul").value.trim();
    if (!judul) return;
    const deskripsi = formTugas
      .querySelector("#input-tugas-deskripsi")
      .value.trim();
    const deadline = formTugas.querySelector("#input-tugas-deadline").value;
    if (idYangDiedit) {
      semuaTugas = semuaTugas.map((tugas) =>
        tugas.id === idYangDiedit
          ? new Tugas(idYangDiedit, judul, deskripsi, deadline, tugas.selesai)
          : tugas,
      );
    } else {
      semuaTugas.push(new Tugas(Date.now(), judul, deskripsi, deadline));
    }
    await penyimpananTugas.simpan(semuaTugas);
    render();
  });

  formJadwal.addEventListener("submit", async (event) => {
    event.preventDefault();
    const matkul = formJadwal
      .querySelector("#input-jadwal-matkul")
      .value.trim();
    if (!matkul) return;
    const waktu = formJadwal.querySelector("#input-jadwal-waktu").value.trim();
    const ruang = formJadwal.querySelector("#input-jadwal-ruang").value.trim();
    const hari = formJadwal.querySelector("#input-jadwal-hari").value;
    if (idYangDiedit) {
      semuaJadwal = semuaJadwal.map((jadwal) =>
        jadwal.id === idYangDiedit
          ? new Jadwal(idYangDiedit, matkul, waktu, ruang, hari)
          : jadwal,
      );
    } else {
      semuaJadwal.push(new Jadwal(Date.now(), matkul, waktu, ruang, hari));
    }
    await penyimpananJadwal.simpan(semuaJadwal);
    render();
  });

  document
    .getElementById("content")
    .addEventListener("click", async (event) => {
      const target = event.target;
      if (target.matches(".tombol-tambah")) tampilkanForm(target.dataset.type);
      if (target.matches(".tombol-batal")) {
        target.closest("form").classList.add("hidden");
        idYangDiedit = null;
      }
      const item = target.closest(".item");
      if (item) {
        const id = Number(item.dataset.id);
        const aksi = target.dataset.action;
        let perluRender = false;
        if (tabAktif === "tugas") {
          if (aksi === "toggle") {
            semuaTugas = semuaTugas.map((t) =>
              t.id === id ? { ...t, selesai: !t.selesai } : t,
            );
            perluRender = true;
          } else if (aksi === "edit")
            tampilkanForm(
              "tugas",
              semuaTugas.find((t) => t.id === id),
            );
          else if (aksi === "delete") {
            if (confirm("Yakin ingin menghapus tugas ini?")) {
              semuaTugas = semuaTugas.filter((t) => t.id !== id);
              perluRender = true;
            }
          }
          if (perluRender) await penyimpananTugas.simpan(semuaTugas);
        } else {
          if (aksi === "edit")
            tampilkanForm(
              "jadwal",
              semuaJadwal.find((j) => j.id === id),
            );
          else if (aksi === "delete") {
            if (confirm("Yakin ingin menghapus jadwal ini?")) {
              semuaJadwal = semuaJadwal.filter((j) => j.id !== id);
              perluRender = true;
            }
          }
          if (perluRender) await penyimpananJadwal.simpan(semuaJadwal);
        }
        if (perluRender) render();
      }
    });

  const init = async () => {
    semuaTugas = await penyimpananTugas.ambil();
    semuaJadwal = await penyimpananJadwal.ambil();
    render();
  };
  init();
});
