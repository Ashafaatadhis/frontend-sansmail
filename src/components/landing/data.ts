import { Zap, Globe, Clock, Shield, Inbox, Mail, type LucideIcon } from 'lucide-react'

export const WA_URL = `https://wa.me/6281214768087?text=${encodeURIComponent('Halo, saya ingin membeli license SansMail 🙏')}`

export const navLinks = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
]

export interface Feature {
  title: string
  desc: string
  icon: LucideIcon
  tint: string
}

export const features: Feature[] = [
  { title: 'Inbox Realtime', desc: 'Email masuk langsung muncul tanpa refresh. Powered by WebSocket — tidak ada delay sama sekali.', icon: Zap, tint: 'var(--card-tint-yellow)' },
  { title: 'Domain Custom', desc: 'Pakai domain kamu sendiri. Tinggal set DNS records, langsung bisa dipakai.', icon: Globe, tint: 'var(--card-tint-mint)' },
  { title: 'Auto-Expire 1 Bulan', desc: 'Email otomatis terhapus setelah 30 hari. Privasi terjaga tanpa hapus manual.', icon: Clock, tint: 'var(--card-tint-sky)' },
  { title: 'Multi Email', desc: 'Generate banyak alamat email berbeda dalam satu session. Bebas pakai sepuasnya.', icon: Mail, tint: 'var(--card-tint-peach)' },
  { title: 'Domain Bawaan', desc: 'Tidak punya domain? Tidak masalah. Pakai domain shared kami yang sudah siap.', icon: Inbox, tint: 'var(--card-tint-lavender)' },
  { title: 'Privasi Terjamin', desc: 'Tidak perlu daftar akun. Tidak ada data pribadi yang disimpan permanen.', icon: Shield, tint: 'var(--card-tint-rose)' },
]

export const steps = [
  { n: '01', title: 'Masukkan License Key', desc: 'Login dengan license key yang kamu beli. Langsung masuk, tidak perlu daftar akun.' },
  { n: '02', title: 'Generate Email', desc: 'Pilih domain, klik generate. Alamat email siap dipakai dalam hitungan detik.' },
  { n: '03', title: 'Terima Email Realtime', desc: 'Email masuk langsung muncul di inbox secara live. Baca, tunggu, atau generate lagi.' },
]

export const stats = [
  { value: '< 1 detik', label: 'Waktu pengiriman email' },
  { value: '30 hari', label: 'Masa aktif email' },
  { value: 'Unlimited', label: 'Email per session' },
]

export const pricingFeatures = [
  'Akses penuh ke semua fitur',
  'Domain shared bawaan tersedia',
  'Support domain custom sendiri',
  'Inbox realtime (WebSocket)',
  'Auto-expire 30 hari',
  'Multi email per session',
]

export const faqs = [
  { q: 'Apa itu SansMail?', a: 'SansMail adalah layanan email sementara (temporary email) berbasis SaaS. Kamu bisa generate alamat email acak yang menerima email secara realtime — cocok untuk registrasi, verifikasi, atau keperluan privasi.' },
  { q: 'Berapa lama email disimpan?', a: 'Email disimpan selama 30 hari sejak masuk ke inbox. Setelah itu otomatis terhapus dari server. Tidak perlu hapus manual.' },
  { q: 'Bisa pakai domain sendiri?', a: 'Ya! Kamu bisa menambahkan domain custom milik kamu sendiri. Cukup set DNS records (A, MX, SPF) ke server kami, lalu daftarkan di panel. Email yang masuk langsung tersedia di inbox realtime.' },
  { q: 'Bagaimana cara order license?', a: 'Klik tombol "Order via WhatsApp" di halaman ini. Kami konfirmasi pesanan dan kirimkan license key setelah pembayaran dikonfirmasi. Proses cepat, tidak ribet.' },
  { q: 'Apakah license berlaku selamanya?', a: 'License berlaku per bulan. Bayar Rp 15.000/bulan, langsung aktif setelah konfirmasi.' },
  { q: 'Apakah ada batasan jumlah email?', a: 'Tidak ada batasan. Kamu bisa generate email dan menerima pesan sebanyak yang dibutuhkan selama session aktif.' },
]
