from abc import ABC, abstractmethod
from typing import List, Optional


class LibraryItem(ABC):
    """
    Abstract base class untuk semua item perpustakaan.
    Menerapkan konsep abstraction dan menjadi blueprint untuk item-item spesifik.
    """
    
    def __init__(self, item_id: str, title: str, year: int):
        """
        Constructor untuk LibraryItem.
        
        Args:
            item_id: ID unik untuk item
            title: Judul item
            year: Tahun publikasi
        """
        self.__item_id = item_id  # Private attribute (encapsulation)
        self._title = title  # Protected attribute
        self._year = year
    
    @property
    def item_id(self) -> str:
        """Property untuk mengakses item_id (read-only)"""
        return self.__item_id
    
    @property
    def title(self) -> str:
        """Property untuk mengakses title"""
        return self._title
    
    @title.setter
    def title(self, value: str):
        """Setter untuk title dengan validasi"""
        if not value or not value.strip():
            raise ValueError("Judul tidak boleh kosong")
        self._title = value.strip()
    
    @abstractmethod
    def get_info(self) -> str:
        """
        Abstract method yang harus diimplementasikan oleh subclass.
        Mengembalikan informasi detail tentang item.
        """
        pass
    
    @abstractmethod
    def get_type(self) -> str:
        """
        Abstract method untuk mendapatkan tipe item.
        """
        pass
    
    def __str__(self) -> str:
        """String representation untuk item"""
        return f"[{self.item_id}] {self.title} ({self._year})"


class Book(LibraryItem):
    """
    Class untuk item buku, mewarisi dari LibraryItem.
    Implementasi konkrit dari abstract class.
    """
    
    def __init__(self, item_id: str, title: str, year: int, author: str, pages: int):
        """
        Constructor untuk Book.
        
        Args:
            item_id: ID unik buku
            title: Judul buku
            year: Tahun terbit
            author: Nama penulis
            pages: Jumlah halaman
        """
        super().__init__(item_id, title, year)
        self._author = author
        self._pages = pages
    
    @property
    def author(self) -> str:
        """Property untuk mengakses author"""
        return self._author
    
    def get_info(self) -> str:
        """
        Implementasi method abstract dari parent class.
        Mengembalikan informasi lengkap tentang buku.
        """
        return (f"📚 BUKU\n"
                f"   ID      : {self.item_id}\n"
                f"   Judul   : {self.title}\n"
                f"   Penulis : {self._author}\n"
                f"   Tahun   : {self._year}\n"
                f"   Halaman : {self._pages}")
    
    def get_type(self) -> str:
        """Implementasi method abstract untuk tipe item"""
        return "Buku"


class Magazine(LibraryItem):
    """
    Class untuk item majalah, mewarisi dari LibraryItem.
    Implementasi konkrit dari abstract class.
    """
    
    def __init__(self, item_id: str, title: str, year: int, publisher: str, issue: int):
        """
        Constructor untuk Magazine.
        
        Args:
            item_id: ID unik majalah
            title: Judul majalah
            year: Tahun terbit
            publisher: Nama penerbit
            issue: Nomor edisi
        """
        super().__init__(item_id, title, year)
        self._publisher = publisher
        self._issue = issue
    
    @property
    def publisher(self) -> str:
        """Property untuk mengakses publisher"""
        return self._publisher
    
    def get_info(self) -> str:
        """
        Implementasi method abstract dari parent class.
        Mengembalikan informasi lengkap tentang majalah.
        """
        return (f"📰 MAJALAH\n"
                f"   ID       : {self.item_id}\n"
                f"   Judul    : {self.title}\n"
                f"   Penerbit : {self._publisher}\n"
                f"   Tahun    : {self._year}\n"
                f"   Edisi    : #{self._issue}")
    
    def get_type(self) -> str:
        """Implementasi method abstract untuk tipe item"""
        return "Majalah"


class Library:
    """
    Class untuk mengelola koleksi perpustakaan.
    Menerapkan encapsulation dan composition.
    """
    
    def __init__(self, name: str):
        """
        Constructor untuk Library.
        
        Args:
            name: Nama perpustakaan
        """
        self.__name = name  # Private attribute
        self.__items: List[LibraryItem] = []  # Private collection
    
    @property
    def name(self) -> str:
        """Property untuk nama perpustakaan (read-only)"""
        return self.__name
    
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan.
        
        Args:
            item: LibraryItem yang akan ditambahkan
            
        Returns:
            True jika berhasil, False jika ID sudah ada
        """
        # Validasi ID unik
        if any(i.item_id == item.item_id for i in self.__items):
            return False
        
        self.__items.append(item)
        return True
    
    def get_all_items(self) -> List[LibraryItem]:
        """
        Mendapatkan semua item di perpustakaan.
        
        Returns:
            List dari semua LibraryItem
        """
        return self.__items.copy()  # Return copy untuk encapsulation
    
    def find_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID.
        
        Args:
            item_id: ID item yang dicari
            
        Returns:
            LibraryItem jika ditemukan, None jika tidak
        """
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def find_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (case-insensitive, partial match).
        
        Args:
            title: Judul atau bagian judul yang dicari
            
        Returns:
            List dari LibraryItem yang cocok
        """
        title_lower = title.lower()
        return [item for item in self.__items 
                if title_lower in item.title.lower()]
    
    def display_items(self, items: Optional[List[LibraryItem]] = None):
        """
        Menampilkan daftar item dengan format yang rapi.
        Menerapkan polymorphism - memanggil method get_type() yang berbeda untuk setiap subclass.
        
        Args:
            items: List item yang akan ditampilkan, jika None akan tampilkan semua
        """
        items_to_display = items if items is not None else self.__items
        
        if not items_to_display:
            print("📭 Tidak ada buku yang ditemukan.")
            return
        
        print(f"\n{'='*60}")
        print(f"{'DAFTAR BUKU PERPUSTAKAAN':^60}")
        print(f"{'='*60}")
        
        for item in items_to_display:
            # Polymorphism: Memanggil method yang sama tapi implementasi berbeda
            print(f"\n{item}")
        
        print(f"\n{'='*60}")
        print(f"Total: {len(items_to_display)} buku\n")


def print_header(title: str):
    """Menampilkan header dengan format yang rapi"""
    print("\n" + "="*60)
    print(title.center(60))
    print("="*60)


def add_book_interactive(library: Library):
    """
    Menambahkan buku secara interaktif dengan input user.
    """
    print_header("TAMBAH BUKU BARU")
    
    try:
        item_id = input("\n📌 ID Buku (contoh: B001): ").strip()
        if not item_id:
            print("❌ ID tidak boleh kosong!")
            return
        
        # Cek apakah ID sudah ada
        if library.find_by_id(item_id):
            print(f"❌ ID '{item_id}' sudah digunakan!")
            return
        
        title = input("📖 Judul Buku: ").strip()
        if not title:
            print("❌ Judul tidak boleh kosong!")
            return
        
        author = input("✍️  Penulis: ").strip()
        if not author:
            print("❌ Penulis tidak boleh kosong!")
            return
        
        year_str = input("📅 Tahun Terbit: ").strip()
        try:
            year = int(year_str)
            if year < 1000 or year > 2100:
                print("❌ Tahun tidak valid!")
                return
        except ValueError:
            print("❌ Tahun harus berupa angka!")
            return
        
        pages_str = input("📄 Jumlah Halaman: ").strip()
        try:
            pages = int(pages_str)
            if pages <= 0:
                print("❌ Jumlah halaman harus lebih dari 0!")
                return
        except ValueError:
            print("❌ Jumlah halaman harus berupa angka!")
            return
        
        # Buat object buku baru
        new_book = Book(item_id, title, year, author, pages)
        
        # Tambahkan ke perpustakaan
        if library.add_item(new_book):
            print("\n✅ Buku berhasil ditambahkan!")
            print("\n" + new_book.get_info())
        else:
            print("❌ Gagal menambahkan buku!")
    
    except Exception as e:
        print(f"❌ Terjadi kesalahan: {str(e)}")


def search_book(library: Library):
    """
    Mencari buku dengan berbagai metode pencarian.
    """
    print_header("CARI BUKU")
    print("\n1. Cari berdasarkan ID")
    print("2. Cari berdasarkan Judul")
    print("0. Kembali")
    
    choice = input("\n▶ Pilih metode pencarian: ").strip()
    
    if choice == "1":
        # Cari berdasarkan ID
        print("\n" + "-"*60)
        item_id = input("🔍 Masukkan ID buku: ").strip()
        found = library.find_by_id(item_id)
        if found:
            print("\n✅ Buku ditemukan!")
            print("\n" + found.get_info())
        else:
            print(f"\n❌ Buku dengan ID '{item_id}' tidak ditemukan!")
    
    elif choice == "2":
        # Cari berdasarkan judul
        print("\n" + "-"*60)
        title = input("🔍 Masukkan judul (atau sebagian): ").strip()
        results = library.find_by_title(title)
        if results:
            print(f"\n✅ Ditemukan {len(results)} buku:")
            library.display_items(results)
        else:
            print(f"\n❌ Tidak ada buku dengan judul '{title}'!")
    
    elif choice == "0":
        return
    else:
        print("\n❌ Pilihan tidak valid!")


def display_all_books(library: Library):
    """
    Menampilkan semua buku yang ada di perpustakaan.
    """
    print_header("DAFTAR SEMUA BUKU")
    all_items = library.get_all_items()
    
    if all_items:
        library.display_items()
    else:
        print("\n📭 Perpustakaan masih kosong!")
        print("Silakan tambahkan buku terlebih dahulu.\n")


def init_sample_data(library: Library):
    """
    Menginisialisasi data contoh untuk perpustakaan.
    """
    book1 = Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata", 529)
    book2 = Book("B002", "Bumi Manusia", 1980, "Pramoedya Ananta Toer", 535)
    book3 = Book("B003", "Cantik Itu Luka", 2002, "Eka Kurniawan", 520)
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)


def main():
    """
    Fungsi utama - Menu interaktif sistem perpustakaan.
    """
    library = Library("Perpustakaan Kota")
    
    # Inisialisasi dengan data contoh
    init_sample_data(library)
    
    print_header("SISTEM MANAJEMEN PERPUSTAKAAN")
    print("\n✅ Data contoh berhasil dimuat (3 buku)")
    
    while True:
        print("\n" + "="*60)
        print("📚 MENU UTAMA".center(60))
        print("="*60)
        print("\n1. Tambah Buku")
        print("2. Cari Buku")
        print("3. Tampilkan Semua Buku")
        print("0. Keluar")
        print("-" * 60)
        
        choice = input("\n▶ Pilih menu: ").strip()
        
        if choice == "1":
            add_book_interactive(library)
        elif choice == "2":
            search_book(library)
        elif choice == "3":
            display_all_books(library)
        elif choice == "0":
            print_header("TERIMA KASIH")
            print("\n👋 Terima kasih telah menggunakan sistem perpustakaan!")
            print("="*60 + "\n")
            break
        else:
            print("\n❌ Pilihan tidak valid! Silakan pilih menu 1-3 atau 0.")
        
        input("\n⏎ Tekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()
