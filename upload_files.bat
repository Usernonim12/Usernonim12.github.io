@echo off
REM Script untuk upload files dari folder lokal ke GitHub repository
REM Cara pakai: double-click file ini atau jalankan dari Command Prompt

REM Konfigurasi
set "SOURCE_PATH=C:\Users\sui\Source Code\datacode\random\custom\tugas 2"
set "REPO_URL=https://github.com/Usernonim12/Usernonim12.github.io.git"
set "COMMIT_MESSAGE=Initial commit"
set "BRANCH=main"

echo === Upload Files ke GitHub Repository ===
echo.

REM Cek apakah source path ada
if not exist "%SOURCE_PATH%" (
    echo Error: Source path tidak ditemukan: %SOURCE_PATH%
    echo Silakan edit SOURCE_PATH di script ini dengan path yang benar
    pause
    exit /b 1
)

REM Cek apakah sudah di dalam git repository
if exist ".git" (
    echo Repository git sudah ada
) else (
    echo Inisialisasi git repository...
    git init
    git remote add origin %REPO_URL%
)

REM Copy files dari source path
echo Copying files dari %SOURCE_PATH%...
xcopy "%SOURCE_PATH%\*" . /E /I /Y

REM Tampilkan files yang akan di-commit
echo.
echo Files yang akan di-commit:
git status --short

REM Add semua files
echo.
echo Adding files ke git...
git add .

REM Commit
echo.
echo Committing dengan message: %COMMIT_MESSAGE%
git commit -m "%COMMIT_MESSAGE%"

REM Push ke remote
echo.
echo Pushing ke branch %BRANCH%...
git branch -M %BRANCH%
git push -u origin %BRANCH%

echo.
echo === Selesai! Files berhasil di-upload ke GitHub ===
pause
