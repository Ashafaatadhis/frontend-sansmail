import { Check, MessageCircle } from 'lucide-react'
import { pricingFeatures, WA_URL } from './data'

export default function Pricing() {
  return (
    <section id="harga" style={{ background: 'var(--canvas)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', width: '100%' }}>

        {/* Header */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>
          HARGA
        </div>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.1, margin: '0 0 10px', color: 'var(--ink)' }}>
          Satu harga.<br />
          <span style={{ color: 'var(--primary)' }}>Semua fitur.</span>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--steel)', margin: '0 0 24px', lineHeight: 1.6 }}>
          Tidak ada tier, tidak ada add-on. Langsung aktif setelah order.
        </p>

        {/* Card */}
        <div style={{ background: 'var(--canvas)', borderRadius: 16, border: '2px solid var(--primary)', padding: '24px', textAlign: 'left', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, right: 18, background: 'var(--primary)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 7px 7px', letterSpacing: 0.5 }}>
            AKTIF
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--steel)', marginBottom: 2 }}>License Key</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-1.5px', lineHeight: 1 }}>
                Rp 15.000
              </div>
              <div style={{ fontSize: 12, color: 'var(--stone)', marginTop: 2 }}>per bulan</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--steel)', lineHeight: 1.5 }}>
              Bayar via<br />WhatsApp
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--hairline)', marginBottom: 16 }} />

          {/* Features — 2 kolom */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
            {pricingFeatures.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--charcoal)' }}>
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'var(--card-tint-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={9} color="var(--brand-green, #1aae39)" strokeWidth={3} />
                </div>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '11px 20px', borderRadius: 8, background: 'var(--primary)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, boxSizing: 'border-box' }}>
            <MessageCircle size={15} />
            Order via WhatsApp
          </a>
          <p style={{ fontSize: 11, color: 'var(--stone)', textAlign: 'center', marginTop: 8, marginBottom: 0 }}>
            Konfirmasi dalam {'<'} 5 menit di jam aktif
          </p>
        </div>

      </div>
    </section>
  )
}
