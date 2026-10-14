# 🍦 Kasir Jagoan Pintar — Apotek Management Dashboard

Aplikasi web manajemen program edukasi dan _reward_ untuk anak-anak di apotek. Program ini mengajak anak-anak menjawab tantangan pertanyaan harian sesuai kategori usia (PAUD/TK, SD Kecil, SD Besar) untuk mengumpulkan 3 stempel yang dapat ditukarkan dengan **1 Es Krim Gratis** (kuota harian 10 anak/hari).

---

## 🚀 Fitur Utama

- **🏠 Beranda & Kasir (Mobile First):**
  - Pencarian nama anak & pendaftaran anak baru.
  - Tracking stempel (_progress bar_ 1–3 stempel) dengan indikator visual.
  - Widget **"Hampir Klaim"** yang menandai anak dengan 2 stempel.
  - **Pencegahan Double Stempel:** Peringatan otomatis jika anak sudah mengambil jatah stempel di hari yang sama.
- **🎲 Sistem Acak Soal (Quiz Generator):**
  - Fitur acak soal otomatis sesuai kategori usia (`PAUD`, `SD_KECIL`, `SD_BESAR`).
  - Animasi kocok soal interaktif (efek mesin slot/dadu).
  - Tombol **"✅ Jawaban Benar"** langsung di dalam modal untuk otomatis menambah stempel & mencatat log.
- **📚 Bank Soal Terpisah:**
  - Halaman khusus kelola bank soal harian (tambah soal baru, filter kategori, kunci jawaban, status aktif/nonaktif).
- **📊 Laporan Keuangan & Reward Es Krim:**
  - Laporan rekapitulasi es krim terkeluarkan & estimasi biaya promosi bulanan (Rp2.000/bks).
  - **Fitur Ekspor CSV/Excel:** Unduh rekapitulasi riwayat data anak & klaim es krim sekali klik.
- **📱 Responsive Bottom Navigation Bar:**
  - Tampilan navigasi melayang di bawah layar HP untuk kemudahan operasional staf kasir apotek.
- **🔄 Reset Kuota Harian:**
  - Kuota otomatis terisi ulang per hari, dilengkapi tombol _reset_ manual darurat untuk pengujian.

---

## 🛠️ Modul & Teknologi (Tech Stack)

- **Frontend:** Vue 3 (`<script setup>`)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Backend & Database:** Supabase (PostgreSQL & Realtime Client)
- **Icons & UI:** Heroicons & Custom CSS Animations

---

## 🗄️ Skema Database Supabase

Aplikasi ini menggunakan 4 tabel utama di Supabase Database:

### 1. `anak`

| Column                  | Type          | Description                               |
| :---------------------- | :------------ | :---------------------------------------- |
| `id`                    | `uuid` (PK)   | Unique ID anak                            |
| `nama`                  | `text`        | Nama lengkap anak                         |
| `tingkat`               | `text`        | Kategori (`PAUD`, `SD_KECIL`, `SD_BESAR`) |
| `jumlah_stempel`        | `int4`        | Jumlah stempel saat ini (0–3)             |
| `total_es_krim_diklaim` | `int4`        | Total es krim yang pernah ditukarkan      |
| `created_at`            | `timestamptz` | Tanggal pendaftaran                       |

### 2. `soal`

| Column          | Type        | Description                       |
| :-------------- | :---------- | :-------------------------------- |
| `id`            | `uuid` (PK) | Unique ID soal                    |
| `tingkat`       | `text`      | Kategori usia                     |
| `pertanyaan`    | `text`      | Teks pertanyaan                   |
| `kunci_jawaban` | `text`      | Kunci jawaban untuk panduan kasir |
| `aktif`         | `boolean`   | Status keaktifan soal             |

### 3. `log_harian`

| Column       | Type          | Description               |
| :----------- | :------------ | :------------------------ |
| `id`         | `uuid` (PK)   | Unique ID log             |
| `anak_id`    | `uuid` (FK)   | Relasi ke tabel `anak`    |
| `tanggal`    | `date`        | Tanggal transaksi stempel |
| `created_at` | `timestamptz` | Waktu spesifik pencatatan |

### 4. `log_klaim`

| Column       | Type          | Description               |
| :----------- | :------------ | :------------------------ |
| `id`         | `uuid` (PK)   | Unique ID klaim           |
| `anak_id`    | `uuid` (FK)   | Relasi ke tabel `anak`    |
| `tanggal`    | `date`        | Tanggal penukaran es krim |
| `created_at` | `timestamptz` | Waktu pencatatan laporan  |

> **Catatan:** Pastikan _Row Level Security_ (RLS) pada keempat tabel di atas sudah di-set ke **Disabled / Unrestricted** atau dikonfigurasi kebijakan _public read/write/delete_-nya.

---

## 📦 Panduan Instalasi Lokal

1. **Clone Repositori:**
   ```bash
   git clone [https://github.com/username-kamu/jagoan-pintar.git](https://github.com/username-kamu/jagoan-pintar.git)
   cd jagoan-pintar
   ```
