from abc import ABC, abstractmethod
from datetime import datetime
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
        self._is_available = True  # Status ketersediaan
    
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
    
    @property
    def is_available(self) -> bool:
        """Property untuk status ketersediaan"""
        return self._is_available
    
    def borrow(self) -> bool:
        """Method untuk meminjam item"""
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self) -> bool:
        """Method untuk mengembalikan item"""
        if not self._is_available:
            self._is_available = True
            return True
        return False
    
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
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[{self.item_id}] {self.title} ({self._year}) - {status}"


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
        status = "Tersedia" if self.is_available else "Dipinjam"
        return (f"📚 BUKU\n"
                f"   ID: {self.item_id}\n"
                f"   Judul: {self.title}\n"
                f"   Penulis: {self._author}\n"
                f"   Tahun: {self._year}\n"
                f"   Halaman: {self._pages}\n"
                f"   Status: {status}")
    
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
        status = "Tersedia" if self.is_available else "Dipinjam"
        return (f"📰 MAJALAH\n"
                f"   ID: {self.item_id}\n"
                f"   Judul: {self.title}\n"
                f"   Penerbit: {self._publisher}\n"
                f"   Tahun: {self._year}\n"
                f"   Edisi: #{self._issue}\n"
                f"   Status: {status}")
    
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
    
    def get_available_items(self) -> List[LibraryItem]:
        """
        Mendapatkan semua item yang tersedia untuk dipinjam.
        
        Returns:
            List dari LibraryItem yang tersedia
        """
        return [item for item in self.__items if item.is_available]
    
    def display_items(self, items: Optional[List[LibraryItem]] = None):
        """
        Menampilkan daftar item dengan format yang rapi.
        Menerapkan polymorphism - memanggil method get_type() yang berbeda untuk setiap subclass.
        
        Args:
            items: List item yang akan ditampilkan, jika None akan tampilkan semua
        """
        items_to_display = items if items is not None else self.__items
        
        if not items_to_display:
            print("📭 Tidak ada item yang ditemukan.")
            return
        
        print(f"\n{'='*60}")
        print(f"{'DAFTAR KOLEKSI':^60}")
        print(f"{'='*60}")
        
        for item in items_to_display:
            # Polymorphism: Memanggil method yang sama tapi implementasi berbeda
            print(f"\n{item}")
        
        print(f"\n{'='*60}")
        print(f"Total: {len(items_to_display)} item\n")
    
    def get_statistics(self) -> dict:
        """
        Mendapatkan statistik perpustakaan.
        
        Returns:
            Dictionary berisi statistik
        """
        total = len(self.__items)
        available = len(self.get_available_items())
        borrowed = total - available
        
        books = sum(1 for item in self.__items if isinstance(item, Book))
        magazines = sum(1 for item in self.__items if isinstance(item, Magazine))
        
        return {
            'total': total,
            'available': available,
            'borrowed': borrowed,
            'books': books,
            'magazines': magazines
        }


def clear_screen():
    """Membersihkan layar console"""
    import os
    os.system('cls' if os.name == 'nt' else 'clear')


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
        item_id = input("📌 ID Buku (contoh: B004): ").strip()
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


def add_magazine_interactive(library: Library):
    """
    Menambahkan majalah secara interaktif dengan input user.
    """
    print_header("TAMBAH MAJALAH BARU")
    
    try:
        item_id = input("📌 ID Majalah (contoh: M003): ").strip()
        if not item_id:
            print("❌ ID tidak boleh kosong!")
            return
        
        # Cek apakah ID sudah ada
        if library.find_by_id(item_id):
            print(f"❌ ID '{item_id}' sudah digunakan!")
            return
        
        title = input("📰 Judul Majalah: ").strip()
        if not title:
            print("❌ Judul tidak boleh kosong!")
            return
        
        publisher = input("🏢 Penerbit: ").strip()
        if not publisher:
            print("❌ Penerbit tidak boleh kosong!")
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
        
        issue_str = input("🔢 Nomor Edisi: ").strip()
        try:
            issue = int(issue_str)
            if issue <= 0:
                print("❌ Nomor edisi harus lebih dari 0!")
                return
        except ValueError:
            print("❌ Nomor edisi harus berupa angka!")
            return
        
        # Buat object majalah baru
        new_magazine = Magazine(item_id, title, year, publisher, issue)
        
        # Tambahkan ke perpustakaan
        if library.add_item(new_magazine):
            print("\n✅ Majalah berhasil ditambahkan!")
            print("\n" + new_magazine.get_info())
        else:
            print("❌ Gagal menambahkan majalah!")
    
    except Exception as e:
        print(f"❌ Terjadi kesalahan: {str(e)}")


def search_menu(library: Library):
    """
    Menu pencarian dengan berbagai opsi.
    """
    print_header("MENU PENCARIAN")
    print("\n1. Cari berdasarkan ID")
    print("2. Cari berdasarkan Judul")
    print("3. Cari berdasarkan Penulis (Buku)")
    print("4. Tampilkan semua item")
    print("5. Tampilkan hanya Buku")
    print("6. Tampilkan hanya Majalah")
    print("7. Tampilkan item Tersedia")
    print("0. Kembali")
    
    choice = input("\n▶ Pilih opsi pencarian: ").strip()
    
    if choice == "1":
        # Cari berdasarkan ID
        print("\n" + "-"*60)
        item_id = input("🔍 Masukkan ID: ").strip()
        found = library.find_by_id(item_id)
        if found:
            print("\n✅ Item ditemukan!")
            print("\n" + found.get_info())
        else:
            print(f"\n❌ Item dengan ID '{item_id}' tidak ditemukan!")
    
    elif choice == "2":
        # Cari berdasarkan judul
        print("\n" + "-"*60)
        title = input("🔍 Masukkan judul (atau sebagian): ").strip()
        results = library.find_by_title(title)
        if results:
            print(f"\n✅ Ditemukan {len(results)} item:")
            library.display_items(results)
        else:
            print(f"\n❌ Tidak ada item dengan judul '{title}'!")
    
    elif choice == "3":
        # Cari berdasarkan penulis
        print("\n" + "-"*60)
        author = input("🔍 Masukkan nama penulis: ").strip().lower()
        all_items = library.get_all_items()
        results = [item for item in all_items 
                   if isinstance(item, Book) and author in item.author.lower()]
        if results:
            print(f"\n✅ Ditemukan {len(results)} buku:")
            library.display_items(results)
        else:
            print(f"\n❌ Tidak ada buku dari penulis '{author}'!")
    
    elif choice == "4":
        # Tampilkan semua
        all_items = library.get_all_items()
        if all_items:
            library.display_items()
        else:
            print("\n📭 Perpustakaan masih kosong!")
    
    elif choice == "5":
        # Tampilkan hanya buku
        all_items = library.get_all_items()
        books = [item for item in all_items if isinstance(item, Book)]
        if books:
            print(f"\n📚 Daftar Buku ({len(books)} item)")
            library.display_items(books)
        else:
            print("\n📭 Tidak ada buku di perpustakaan!")
    
    elif choice == "6":
        # Tampilkan hanya majalah
        all_items = library.get_all_items()
        magazines = [item for item in all_items if isinstance(item, Magazine)]
        if magazines:
            print(f"\n📰 Daftar Majalah ({len(magazines)} item)")
            library.display_items(magazines)
        else:
            print("\n📭 Tidak ada majalah di perpustakaan!")
    
    elif choice == "7":
        # Tampilkan item tersedia
        available = library.get_available_items()
        if available:
            print(f"\n✅ Item Tersedia ({len(available)} item)")
            library.display_items(available)
        else:
            print("\n📭 Tidak ada item yang tersedia saat ini!")
    
    elif choice == "0":
        return
    else:
        print("\n❌ Pilihan tidak valid!")


def borrow_item(library: Library):
    """
    Meminjam item dari perpustakaan.
    """
    print_header("PINJAM ITEM")
    item_id = input("\n📌 Masukkan ID item yang ingin dipinjam: ").strip()
    
    item = library.find_by_id(item_id)
    if not item:
        print(f"❌ Item dengan ID '{item_id}' tidak ditemukan!")
        return
    
    if item.borrow():
        print(f"\n✅ Berhasil meminjam '{item.title}'!")
    else:
        print(f"\n❌ Item '{item.title}' sedang dipinjam!")


def return_item(library: Library):
    """
    Mengembalikan item ke perpustakaan.
    """
    print_header("KEMBALIKAN ITEM")
    item_id = input("\n📌 Masukkan ID item yang ingin dikembalikan: ").strip()
    
    item = library.find_by_id(item_id)
    if not item:
        print(f"❌ Item dengan ID '{item_id}' tidak ditemukan!")
        return
    
    if item.return_item():
        print(f"\n✅ Berhasil mengembalikan '{item.title}'!")
    else:
        print(f"\n❌ Item '{item.title}' tidak sedang dipinjam!")


def show_statistics(library: Library):
    """
    Menampilkan statistik perpustakaan.
    """
    print_header("STATISTIK PERPUSTAKAAN")
    stats = library.get_statistics()
    
    print(f"\n📊 Total Koleksi    : {stats['total']} item")
    print(f"✅ Tersedia         : {stats['available']} item")
    print(f"📤 Dipinjam         : {stats['borrowed']} item")
    print(f"📚 Jumlah Buku      : {stats['books']} item")
    print(f"📰 Jumlah Majalah   : {stats['magazines']} item")


def init_sample_data(library: Library):
    """
    Menginisialisasi data contoh untuk perpustakaan.
    """
    book1 = Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata", 529)
    book2 = Book("B002", "Bumi Manusia", 1980, "Pramoedya Ananta Toer", 535)
    book3 = Book("B003", "Cantik Itu Luka", 2002, "Eka Kurniawan", 520)
    
    magazine1 = Magazine("M001", "National Geographic Indonesia", 2024, "NG Media", 12)
    magazine2 = Magazine("M002", "Tempo", 2024, "Tempo Media", 48)
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)
    library.add_item(magazine1)
    library.add_item(magazine2)


def main():
    """
    Fungsi utama - Menu interaktif sistem perpustakaan.
    """
    library = Library("Perpustakaan Kota")
    
    # Inisialisasi dengan data contoh
    init_sample_data(library)
    
    while True:
        print_header("SISTEM MANAJEMEN PERPUSTAKAAN")
        print("\n📚 MENU UTAMA")
        print("-" * 60)
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Cari & Tampilkan Item")
        print("4. Pinjam Item")
        print("5. Kembalikan Item")
        print("6. Statistik Perpustakaan")
        print("0. Keluar")
        print("-" * 60)
        
        choice = input("\n▶ Pilih menu: ").strip()
        
        if choice == "1":
            add_book_interactive(library)
        elif choice == "2":
            add_magazine_interactive(library)
        elif choice == "3":
            search_menu(library)
        elif choice == "4":
            borrow_item(library)
        elif choice == "5":
            return_item(library)
        elif choice == "6":
            show_statistics(library)
        elif choice == "0":
            print_header("TERIMA KASIH")
            print("\n👋 Terima kasih telah menggunakan sistem perpustakaan!")
            print("="*60 + "\n")
            break
        else:
            print("\n❌ Pilihan tidak valid! Silakan pilih menu yang tersedia.")
        
        input("\n⏎ Tekan Enter untuk melanjutkan...")
        # clear_screen()  # Uncomment jika ingin layar dibersihkan


if __name__ == "__main__":
    main()
