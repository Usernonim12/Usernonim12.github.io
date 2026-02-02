# Cara Upload Files dari Folder Lokal ke Repository GitHub

## Status Repository
Repository GitHub Anda sudah diinisialisasi dengan git dan terhubung ke remote:
- **Remote**: https://github.com/Usernonim12/Usernonim12.github.io
- **Branch saat ini**: copilot/initial-commit-files-upload

## Cara Upload Files dari Folder Lokal

Karena file-file dari `/home/sui/Source Code/datacode/random/custom/tugas 2` berada di komputer lokal Anda, berikut adalah langkah-langkah untuk meng-upload files tersebut:

### Opsi 1: Menggunakan Command Line (Terminal)

1. **Clone repository ke komputer lokal** (jika belum):
   ```bash
   git clone https://github.com/Usernonim12/Usernonim12.github.io.git
   cd Usernonim12.github.io
   ```

2. **Copy semua files dari folder sumber ke repository**:
   ```bash
   cp -r "/home/sui/Source Code/datacode/random/custom/tugas 2"/* .
   ```

3. **Tambahkan semua files ke git**:
   ```bash
   git add .
   ```

4. **Commit dengan pesan 'Initial commit'**:
   ```bash
   git commit -m "Initial commit"
   ```

5. **Push ke branch main**:
   ```bash
   git push origin main
   ```

### Opsi 2: Menggunakan GitHub Desktop atau GUI

1. Clone repository menggunakan GitHub Desktop
2. Buka folder repository di File Explorer
3. Copy-paste semua files dari `/home/sui/Source Code/datacode/random/custom/tugas 2` ke folder repository
4. Commit changes dengan message "Initial commit"
5. Push ke remote

### Opsi 3: Upload Langsung via GitHub Web

1. Buka https://github.com/Usernonim12/Usernonim12.github.io
2. Klik tombol "Add file" > "Upload files"
3. Drag and drop files dari folder lokal Anda
4. Tambahkan commit message "Initial commit"
5. Klik "Commit changes"

## Catatan Penting

- Repository ini sudah memiliki git remote yang terkonfigurasi dengan benar
- Pastikan Anda memiliki akses write ke repository
- Jika ada conflict, resolve conflict tersebut sebelum push
- Backup files Anda sebelum melakukan operasi git

## Struktur Saat Ini

Repository saat ini hanya berisi:
- README.md
- .git/ (folder git)

Setelah Anda meng-upload files dari folder lokal, struktur akan berubah sesuai dengan isi folder tersebut.
