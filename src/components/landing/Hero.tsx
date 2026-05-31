import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight, Inbox, Clock } from 'lucide-react'
import { WA_URL } from './data'

const mockEmails = [
  { from: 'noreply@github.com', subject: 'Verify your GitHub account', preview: 'Please verify your email address to continue...', time: '2m', isNew: true, tag: 'GitHub' },
  { from: 'accounts@google.com', subject: 'Kode verifikasi Google kamu', preview: 'G-847291 adalah kode verifikasi kamu', time: '18m', isNew: false, tag: 'Google' },
  { from: 'support@figma.com', subject: 'Welcome to Figma!', preview: 'Hi! Your account is ready. Get started by...', time: '45m', isNew: false, tag: 'Figma' },
]

const tagColors: Record<string, { bg: string; color: string }> = {
  GitHub: { bg: '#24292e', color: '#fff' },
  Google: { bg: '#4285f4', color: '#fff' },
  Figma: { bg: '#a259ff', color: '#fff' },
}

export default function Hero() {
  return (
    <section style={{
      background: 'var(--brand-navy)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '64px 24px 0',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', paddingTop: 48 }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
          Server aktif & siap digunakan
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(36px, 6.5vw, 72px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-2.5px', color: '#fff', margin: '0 auto 20px', maxWidth: 820 }}>
          Email Sementara.{' '}
          <span style={{ color: '#c4b5fd' }}>Instan & Realtime.</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto 36px' }}>
          Generate email sekali pakai dalam detik. Terima pesan langsung tanpa refresh, pakai domain sendiri atau bawaan kami.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 64 }}>
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'var(--primary)', color: '#fff', textDecoration: 'none', boxShadow: '0 0 0 1px rgba(86,69,212,0.5), 0 4px 24px rgba(86,69,212,0.4)' }}>
            <MessageCircle size={15} />
            Order via WhatsApp — Rp 15.000
          </a>
          <Link to="/access" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
            Sudah punya license? Masuk
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* App Mockup Window */}
        <div style={{
          maxWidth: 860,
          margin: '0 auto',
          borderRadius: '16px 16px 0 0',
          background: '#0f1829',
          border: '1px solid rgba(255,255,255,0.08)',
          borderBottom: 'none',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4), 0 40px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Window titlebar */}
          <div style={{ background: '#1a2440', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', boxShadow: '0 0 0 1px rgba(255,95,87,0.3)' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', boxShadow: '0 0 0 1px rgba(254,188,46,0.3)' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 0 1px rgba(40,200,64,0.3)' }} />
            </div>
            {/* URL bar */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '4px 14px', fontSize: 11, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6, minWidth: 200 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                sansmail.my.id/inbox
              </div>
            </div>
            <div style={{ width: 60 }} />
          </div>

          {/* App body */}
          <div style={{ display: 'flex', height: 280 }}>
            {/* Sidebar */}
            <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.05)', background: '#0d1526', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>
                Inbox Aktif
              </div>
              {[
                { email: 'abc12345@sansmail.my.id', count: 3, active: true },
                { email: 'xyz98765@sansmail.my.id', count: 0, active: false },
              ].map((item, i) => (
                <div key={i} style={{ padding: '8px 10px', borderRadius: 8, background: item.active ? 'rgba(86,69,212,0.25)' : 'transparent', border: item.active ? '1px solid rgba(86,69,212,0.3)' : '1px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Inbox size={11} color={item.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} />
                    {item.count > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--primary)', color: '#fff', borderRadius: 9999, padding: '1px 6px' }}>{item.count}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: item.active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: item.active ? 600 : 400 }}>
                    {item.email}
                  </div>
                </div>
              ))}

              {/* Timer */}
              <div style={{ marginTop: 'auto', padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={11} color="rgba(255,255,255,0.3)" />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Aktif 47:22</span>
              </div>
            </div>

            {/* Email list */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* List header */}
              <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>3 pesan masuk</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>abc12345@sansmail.my.id</span>
              </div>

              {/* Emails */}
              {mockEmails.map((mail, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: i === 0 ? 'rgba(86,69,212,0.1)' : 'transparent',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    cursor: 'default',
                  }}
                >
                  {/* Unread dot */}
                  <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: mail.isNew ? '#a78bfa' : 'rgba(255,255,255,0.12)', boxShadow: mail.isNew ? '0 0 6px #a78bfa' : 'none' }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{mail.from}</span>
                        <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 6px', borderRadius: 4, background: tagColors[mail.tag].bg, color: tagColors[mail.tag].color, opacity: 0.8 }}>{mail.tag}</span>
                      </div>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{mail.time} lalu</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: mail.isNew ? 600 : 400, color: mail.isNew ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
                      {mail.subject}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {mail.preview}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade gradient */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, #0a1530, transparent)', pointerEvents: 'none' }} />
        </div>

      </div>
    </section>
  )
}
