#!/bin/bash

# Script untuk upload files dari folder lokal ke GitHub repository
# Cara pakai: bash upload_files.sh

# Konfigurasi
SOURCE_PATH="/home/sui/Source Code/datacode/random/custom/tugas 2"
REPO_URL="https://github.com/Usernonim12/Usernonim12.github.io.git"
COMMIT_MESSAGE="Initial commit"
BRANCH="main"

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Upload Files ke GitHub Repository ===${NC}"

# Cek apakah source path ada
if [ ! -d "$SOURCE_PATH" ]; then
    echo -e "${RED}Error: Source path tidak ditemukan: $SOURCE_PATH${NC}"
    echo "Silakan edit SOURCE_PATH di script ini dengan path yang benar"
    exit 1
fi

# Cek apakah sudah di dalam git repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}Repository git sudah ada${NC}"
else
    echo -e "${YELLOW}Inisialisasi git repository...${NC}"
    git init
    git remote add origin "$REPO_URL"
fi

# Copy files dari source path
echo -e "${YELLOW}Copying files dari $SOURCE_PATH...${NC}"
cp -rv "$SOURCE_PATH"/* .

# Tampilkan files yang akan di-commit
echo -e "${YELLOW}Files yang akan di-commit:${NC}"
git status --short

# Add semua files
echo -e "${YELLOW}Adding files ke git...${NC}"
git add .

# Commit
echo -e "${YELLOW}Committing dengan message: $COMMIT_MESSAGE${NC}"
git commit -m "$COMMIT_MESSAGE"

# Push ke remote
echo -e "${YELLOW}Pushing ke branch $BRANCH...${NC}"
git branch -M "$BRANCH"
git push -u origin "$BRANCH"

echo -e "${GREEN}=== Selesai! Files berhasil di-upload ke GitHub ===${NC}"
