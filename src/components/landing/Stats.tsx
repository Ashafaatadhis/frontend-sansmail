import { useEffect, useState } from 'react'
import { stats } from './data'

function useIsMobile(bp = 640) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return isMobile
}

export default function Stats() {
  const isMobile = useIsMobile()

  return (
    <section style={{ background: 'var(--brand-navy)', padding: '0 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 48 }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 0,
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: isMobile ? '20px 24px' : '0 24px',
                borderRight: !isMobile && i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderBottom: isMobile && i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div style={{
                fontSize: 'clamp(24px, 4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-1.5px',
                lineHeight: 1,
                marginBottom: 8,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
