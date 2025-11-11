"""
Program Pengelolaan Data Nilai Mahasiswa
Dibuat untuk memenuhi tugas praktikum
"""

# Data mahasiswa awal
data_mahasiswa = [
    {
        "nama": "Budi Santoso",
        "nim": "2024001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Siti Nurhaliza",
        "nim": "2024002",
        "nilai_uts": 78,
        "nilai_uas": 82,
        "nilai_tugas": 80
    },
    {
        "nama": "Ahmad Dahlan",
        "nim": "2024003",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 68
    },
    {
        "nama": "Rina Wijaya",
        "nim": "2024004",
        "nilai_uts": 92,
        "nilai_uas": 95,
        "nilai_tugas": 93
    },
    {
        "nama": "Doni Prasetyo",
        "nim": "2024005",
        "nilai_uts": 55,
        "nilai_uas": 60,
        "nilai_tugas": 58
    }
]


def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """
    Menghitung nilai akhir berdasarkan bobot:
    - UTS: 30%
    - UAS: 40%
    - Tugas: 30%
    
    Args:
        nilai_uts (float): Nilai UTS
        nilai_uas (float): Nilai UAS
        nilai_tugas (float): Nilai Tugas
    
    Returns:
        float: Nilai akhir
    """
    nilai_akhir = (nilai_uts * 0.3) + (nilai_uas * 0.4) + (nilai_tugas * 0.3)
    return round(nilai_akhir, 2)


def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir
    
    Args:
        nilai_akhir (float): Nilai akhir mahasiswa
    
    Returns:
        str: Grade (A, B, C, D, atau E)
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def tampilkan_data(data):
    """
    Menampilkan data mahasiswa dalam format tabel
    
    Args:
        data (list): List berisi dictionary data mahasiswa
    """
    if not data:
        print("\nTidak ada data untuk ditampilkan.")
        return
    
    print("\n" + "="*110)
    print(f"{'No':<4} {'Nama':<20} {'NIM':<10} {'UTS':<6} {'UAS':<6} {'Tugas':<6} {'Nilai Akhir':<12} {'Grade':<6}")
    print("="*110)
    
    for i, mhs in enumerate(data, 1):
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"], 
            mhs["nilai_uas"], 
            mhs["nilai_tugas"]
        )
        grade = tentukan_grade(nilai_akhir)
        
        print(f"{i:<4} {mhs['nama']:<20} {mhs['nim']:<10} {mhs['nilai_uts']:<6} "
              f"{mhs['nilai_uas']:<6} {mhs['nilai_tugas']:<6} {nilai_akhir:<12.2f} {grade:<6}")
    
    print("="*110)


def cari_mahasiswa_tertinggi(data):
    """
    Mencari mahasiswa dengan nilai akhir tertinggi
    
    Args:
        data (list): List berisi dictionary data mahasiswa
    
    Returns:
        dict: Data mahasiswa dengan nilai tertinggi
    """
    if not data:
        return None
    
    mhs_tertinggi = data[0]
    nilai_tertinggi = hitung_nilai_akhir(
        mhs_tertinggi["nilai_uts"],
        mhs_tertinggi["nilai_uas"],
        mhs_tertinggi["nilai_tugas"]
    )
    
    for mhs in data[1:]:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"]
        )
        if nilai_akhir > nilai_tertinggi:
            nilai_tertinggi = nilai_akhir
            mhs_tertinggi = mhs
    
    return mhs_tertinggi, nilai_tertinggi


def cari_mahasiswa_terendah(data):
    """
    Mencari mahasiswa dengan nilai akhir terendah
    
    Args:
        data (list): List berisi dictionary data mahasiswa
    
    Returns:
        dict: Data mahasiswa dengan nilai terendah
    """
    if not data:
        return None
    
    mhs_terendah = data[0]
    nilai_terendah = hitung_nilai_akhir(
        mhs_terendah["nilai_uts"],
        mhs_terendah["nilai_uas"],
        mhs_terendah["nilai_tugas"]
    )
    
    for mhs in data[1:]:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"]
        )
        if nilai_akhir < nilai_terendah:
            nilai_terendah = nilai_akhir
            mhs_terendah = mhs
    
    return mhs_terendah, nilai_terendah


def input_mahasiswa_baru(data):
    """
    Menambahkan data mahasiswa baru
    
    Args:
        data (list): List berisi dictionary data mahasiswa
    """
    print("\n=== Input Data Mahasiswa Baru ===")
    
    try:
        nama = input("Nama: ").strip()
        nim = input("NIM: ").strip()
        nilai_uts = float(input("Nilai UTS (0-100): "))
        nilai_uas = float(input("Nilai UAS (0-100): "))
        nilai_tugas = float(input("Nilai Tugas (0-100): "))
        
        # Validasi nilai
        if not (0 <= nilai_uts <= 100 and 0 <= nilai_uas <= 100 and 0 <= nilai_tugas <= 100):
            print("Error: Nilai harus antara 0-100!")
            return
        
        mahasiswa_baru = {
            "nama": nama,
            "nim": nim,
            "nilai_uts": nilai_uts,
            "nilai_uas": nilai_uas,
            "nilai_tugas": nilai_tugas
        }
        
        data.append(mahasiswa_baru)
        print(f"\nData mahasiswa {nama} berhasil ditambahkan!")
        
    except ValueError:
        print("Error: Input nilai tidak valid!")


def filter_by_grade(data, grade):
    """
    Filter mahasiswa berdasarkan grade tertentu
    
    Args:
        data (list): List berisi dictionary data mahasiswa
        grade (str): Grade yang dicari (A, B, C, D, E)
    
    Returns:
        list: List mahasiswa dengan grade yang sesuai
    """
    hasil_filter = []
    
    for mhs in data:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"]
        )
        if tentukan_grade(nilai_akhir) == grade.upper():
            hasil_filter.append(mhs)
    
    return hasil_filter


def hitung_rata_rata_kelas(data):
    """
    Menghitung rata-rata nilai akhir seluruh mahasiswa
    
    Args:
        data (list): List berisi dictionary data mahasiswa
    
    Returns:
        float: Rata-rata nilai kelas
    """
    if not data:
        return 0
    
    total_nilai = 0
    for mhs in data:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"]
        )
        total_nilai += nilai_akhir
    
    return round(total_nilai / len(data), 2)


def menu_utama():
    """
    Menampilkan menu utama program
    """
    while True:
        print("\n" + "="*50)
        print("PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*50)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Tambah Data Mahasiswa Baru")
        print("3. Cari Mahasiswa Nilai Tertinggi")
        print("4. Cari Mahasiswa Nilai Terendah")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Tampilkan Rata-rata Nilai Kelas")
        print("7. Statistik Kelas")
        print("0. Keluar")
        print("="*50)
        
        pilihan = input("Pilih menu (0-7): ").strip()
        
        if pilihan == "1":
            tampilkan_data(data_mahasiswa)
        
        elif pilihan == "2":
            input_mahasiswa_baru(data_mahasiswa)
        
        elif pilihan == "3":
            if data_mahasiswa:
                mhs, nilai = cari_mahasiswa_tertinggi(data_mahasiswa)
                print(f"\nMahasiswa dengan nilai tertinggi:")
                print(f"Nama: {mhs['nama']}")
                print(f"NIM: {mhs['nim']}")
                print(f"Nilai Akhir: {nilai}")
                print(f"Grade: {tentukan_grade(nilai)}")
            else:
                print("\nTidak ada data mahasiswa.")
        
        elif pilihan == "4":
            if data_mahasiswa:
                mhs, nilai = cari_mahasiswa_terendah(data_mahasiswa)
                print(f"\nMahasiswa dengan nilai terendah:")
                print(f"Nama: {mhs['nama']}")
                print(f"NIM: {mhs['nim']}")
                print(f"Nilai Akhir: {nilai}")
                print(f"Grade: {tentukan_grade(nilai)}")
            else:
                print("\nTidak ada data mahasiswa.")
        
        elif pilihan == "5":
            grade = input("Masukkan grade (A/B/C/D/E): ").strip().upper()
            if grade in ["A", "B", "C", "D", "E"]:
                hasil = filter_by_grade(data_mahasiswa, grade)
                print(f"\nMahasiswa dengan grade {grade}:")
                tampilkan_data(hasil)
            else:
                print("Grade tidak valid!")
        
        elif pilihan == "6":
            rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
            print(f"\nRata-rata nilai kelas: {rata_rata}")
            print(f"Grade rata-rata kelas: {tentukan_grade(rata_rata)}")
        
        elif pilihan == "7":
            print("\n=== STATISTIK KELAS ===")
            print(f"Jumlah mahasiswa: {len(data_mahasiswa)}")
            print(f"Rata-rata nilai: {hitung_rata_rata_kelas(data_mahasiswa)}")
            
            if data_mahasiswa:
                mhs_tinggi, nilai_tinggi = cari_mahasiswa_tertinggi(data_mahasiswa)
                mhs_rendah, nilai_rendah = cari_mahasiswa_terendah(data_mahasiswa)
                print(f"Nilai tertinggi: {nilai_tinggi} ({mhs_tinggi['nama']})")
                print(f"Nilai terendah: {nilai_rendah} ({mhs_rendah['nama']})")
                
                # Distribusi grade
                print("\nDistribusi Grade:")
                for grade in ["A", "B", "C", "D", "E"]:
                    jumlah = len(filter_by_grade(data_mahasiswa, grade))
                    print(f"Grade {grade}: {jumlah} mahasiswa")
        
        elif pilihan == "0":
            print("\nTerima kasih telah menggunakan program ini!")
            break
        
        else:
            print("\nPilihan tidak valid! Silakan coba lagi.")


# Jalankan program
if __name__ == "__main__":
    menu_utama()
