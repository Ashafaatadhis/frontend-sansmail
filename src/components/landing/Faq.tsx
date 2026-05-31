import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs, WA_URL } from './data'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" style={{ background: 'var(--brand-navy)', padding: '96px 24px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#c4b5fd', textTransform: 'uppercase', marginBottom: 10 }}>
            FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.5px', margin: 0, color: '#fff' }}>
            Pertanyaan yang sering ditanya
          </h2>
        </div>

        <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', background: 'rgba(255,255,255,0.04)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff', textAlign: 'left', gap: 16 }}
              >
                {faq.q}
                <ChevronDown
                  size={15}
                  color="rgba(255,255,255,0.4)"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                />
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 18px', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Masih ada pertanyaan?{' '}
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{ color: '#c4b5fd', fontWeight: 500, textDecoration: 'none' }}>
            Chat kami di WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
