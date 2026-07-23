# Kompas — Asisten Pribadi

Prototype v1. Chat interface yang tahu tentang proyek-proyek yang sedang berjalan (portfolio, dashboard, TIA jewelry, dll), dijalankan lewat Claude API.

## Struktur

- `index.html` — frontend (chat UI + basis pengetahuan proyek).
- `api/chat.js` — serverless function yang jadi perantara ke Anthropic API. Ini satu-satunya tempat API key dipakai, jadi key tidak pernah terekspos ke browser atau ke kode yang di-commit.

## Cara deploy (GitHub + Vercel, gratis)

1. Push folder ini ke repo GitHub baru.
2. Buka [vercel.com](https://vercel.com), sign in pakai akun GitHub kamu.
3. Klik "Add New Project", pilih repo ini.
4. Sebelum klik Deploy, buka bagian **Environment Variables**, tambahkan:
   - Name: `ANTHROPIC_API_KEY`
   - Value: API key kamu dari [console.anthropic.com](https://console.anthropic.com)
5. Klik Deploy. Vercel otomatis mendeteksi `index.html` sebagai static file dan `api/chat.js` sebagai serverless function.
6. Setelah selesai, situs kamu bisa diakses di URL yang diberikan Vercel (dan otomatis re-deploy tiap kamu push ke GitHub).

## Update basis pengetahuan

Buka `index.html`, cari `const PROJECTS = [...]` di dalam tag `<script>`. Tiap proyek adalah satu objek dengan `name`, `desc` (ringkas, muncul di sidebar), dan `context` (detail lengkap, dikirim ke Claude sebagai konteks).

## Batasan v1

- Riwayat chat belum tersimpan permanen (hilang saat halaman di-refresh).
- Basis pengetahuan masih ditulis manual, belum otomatis narik dari dokumen asli.
- Belum ada autentikasi pengguna — siapa pun yang punya link bisa pakai instance kamu (dan memakai kuota API key kamu). Kalau mau dibatasi hanya untuk kamu sendiri, beri tahu saya, saya bisa tambahkan proteksi password sederhana.
