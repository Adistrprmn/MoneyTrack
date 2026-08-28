# MoneyTrack

Aplikasi web pencatat keuangan pribadi. Dibangun sesuai PRD: React + Vite di frontend, Supabase (Auth + PostgreSQL) di backend, deploy ke Vercel.

## Fitur (MVP)

- Registrasi & login (Supabase Auth), logout, protected route
- Dashboard: total saldo, total pemasukan, total pengeluaran, transaksi terbaru
- Tambah / lihat / edit / hapus pemasukan & pengeluaran
- Riwayat transaksi dengan filter (jenis, kategori, rentang tanggal)
- Ringkasan keuangan mingguan, bulanan, tahunan
- Statistik pengeluaran per kategori (pie chart + bar chart)
- Row Level Security — setiap pengguna hanya melihat datanya sendiri
- Responsive: desktop, laptop, tablet, dan smartphone (sidebar di layar besar, bottom navigation di mobile)

## 1. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql). Ini akan membuat tabel `profiles`, `categories`, `transactions`, beserta Row Level Security policy-nya.
3. Buka **Authentication → Providers**, pastikan provider **Email** aktif.
4. (Opsional, untuk development) Di **Authentication → Settings**, matikan "Confirm email" agar pengguna baru bisa langsung login tanpa verifikasi email.
5. Buka **Project Settings → API**, salin `Project URL` dan `anon public` key.

## 2. Setup Frontend

```bash
npm install
cp .env.example .env.local
```

Isi `.env.local`:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Jalankan development server:

```bash
npm run dev
```

Buka `http://localhost:5173`.

> Kategori default (Gaji, Bonus, Freelance, dst. untuk pemasukan; Makanan, Transportasi, dst. untuk pengeluaran) otomatis dibuat untuk setiap pengguna baru saat pertama kali membuka halaman yang butuh kategori.

## 3. Build & Deploy ke Vercel

```bash
npm run build
```

Di Vercel:

1. Import repository ini sebagai project baru.
2. Framework preset: **Vite**.
3. Tambahkan Environment Variables yang sama seperti `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) di **Project Settings → Environment Variables**.
4. Deploy.

Jangan pernah commit `service_role key` Supabase ke source code — hanya `anon public key` yang boleh dipakai di frontend.

## Struktur Proyek

```
src/
  components/     # AppShell (nav responsif), form transaksi, tabel, dsb.
  contexts/       # AuthContext (state auth Supabase)
  hooks/          # useTransactions, useCategories
  lib/            # supabase.js (client)
  pages/          # Landing, Login, Register, Dashboard, Transaksi, dst.
  utils/          # format, period (mingguan/bulanan/tahunan), categories
supabase/
  schema.sql      # tabel + RLS + trigger pembuatan profil otomatis
```

## Fitur Lanjutan (belum termasuk MVP)

Sesuai PRD: budget bulanan, target menabung, recurring transaction, export CSV/PDF, dark mode, notifikasi, multi-currency, custom category, AI financial assistant.
