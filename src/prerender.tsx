// Script ini dijalankan saat build untuk generate static HTML
// Google crawl HTML ini sebelum JS di-load

export async function prerender() {
  return {
    html: `
      <div>
        <header>
          <a href="/">SansMail</a>
        </header>
        <main>
          <section>
            <h1>Email Sementara. Instan &amp; Realtime.</h1>
            <p>Generate email sekali pakai dalam detik. Terima pesan langsung tanpa refresh, pakai domain sendiri atau domain bawaan kami.</p>
            <p>SansMail adalah layanan <strong>temporary email</strong>, <strong>disposable email</strong>, atau <strong>email sekali pakai</strong> terbaik di Indonesia. Cocok untuk registrasi akun, verifikasi OTP, testing aplikasi, dan menjaga privasi online.</p>
            <a href="https://wa.me/6281214768087">Order via WhatsApp — Rp 15.000</a>
          </section>

          <section id="fitur">
            <h2>Semua yang kamu butuhkan</h2>
            <ul>
              <li>Inbox Realtime via WebSocket — Email masuk langsung tanpa refresh</li>
              <li>Domain Custom Sendiri — Set DNS dan domain langsung aktif</li>
              <li>Auto-Expire 30 Hari — Email otomatis terhapus setelah 30 hari</li>
              <li>Multi Email per Session — Generate banyak email tanpa batasan</li>
              <li>Domain Shared tersedia — Langsung pakai tanpa setup</li>
              <li>Privasi Terjamin — Tidak ada data pribadi yang disimpan</li>
            </ul>
          </section>

          <section id="cara-kerja">
            <h2>Mulai dalam 3 langkah</h2>
            <ol>
              <li>Masukkan License Key — Login dengan license key, langsung aktif</li>
              <li>Generate Email — Pilih domain, klik generate, siap dalam detik</li>
              <li>Terima Email Realtime — Email masuk langsung tanpa refresh via WebSocket</li>
            </ol>
          </section>

          <section id="harga">
            <h2>Satu harga. Semua fitur.</h2>
            <p>Rp 15.000 per bulan. Tidak ada biaya tersembunyi.</p>
            <ul>
              <li>Akses penuh ke semua fitur</li>
              <li>Domain shared bawaan tersedia</li>
              <li>Support domain custom sendiri</li>
              <li>Inbox realtime (WebSocket)</li>
              <li>Auto-expire 30 hari</li>
              <li>Multi email per session</li>
            </ul>
          </section>

          <section id="faq">
            <h2>Pertanyaan yang sering ditanya</h2>
            <dl>
              <dt>Apa itu SansMail?</dt>
              <dd>SansMail adalah layanan email sementara berbasis SaaS. Generate email acak yang menerima pesan secara realtime — untuk registrasi, verifikasi, atau privasi.</dd>
              <dt>Berapa lama email disimpan?</dt>
              <dd>Email disimpan selama 30 hari sejak masuk ke inbox, lalu otomatis terhapus.</dd>
              <dt>Bisa pakai domain sendiri?</dt>
              <dd>Ya! Set DNS records (A, MX, SPF) ke server kami, daftarkan di panel, langsung aktif.</dd>
              <dt>Apakah license berlaku selamanya?</dt>
              <dd>License berlaku per bulan, Rp 15.000/bulan.</dd>
            </dl>
          </section>
        </main>
      </div>
    `,
    head: {
      lang: 'id',
      title: 'SansMail — Email Sementara Instan & Realtime',
    },
  }
}
