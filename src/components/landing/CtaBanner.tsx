import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { WA_URL } from './data'

const marqueeItems = [
  'Verifikasi Akun',
  'Testing Email',
  'Domain Custom',
  'Inbox Realtime',
  'Privasi Terjaga',
  'Generate Instan',
  'Anti Spam',
  'Tanpa Daftar',
]

function useIsMobile(bp = 1024) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return isMobile
}

function VerticalMarquee({ children, speed = 20 }: { children: ReactNode; speed?: number }) {
  return (
    <div
      className="group flex flex-col overflow-hidden h-full"
      style={{ '--duration': `${speed}s` } as React.CSSProperties}
    >
      <div className="flex shrink-0 flex-col animate-marquee-vertical">{children}</div>
      <div className="flex shrink-0 flex-col animate-marquee-vertical" aria-hidden>{children}</div>
    </div>
  )
}

export default function CtaBanner() {
  const isMobile = useIsMobile()
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = marqueeRef.current
    if (!container) return
    let frame: number
    const loop = () => {
      const items = container.querySelectorAll('.marquee-item')
      const rect = container.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      items.forEach(item => {
        const iRect = item.getBoundingClientRect()
        const dist = Math.abs(centerY - (iRect.top + iRect.height / 2))
        const opacity = 1 - Math.min(dist / (rect.height / 2), 1) * 0.8
        ;(item as HTMLElement).style.opacity = String(opacity)
      })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section style={{
      background: 'var(--canvas)',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '64px 24px' : '96px 64px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 0 : 80,
        alignItems: 'center',
      }}>

        {/* Left — CTA */}
        <div className="animate-fade-in-up" style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-2px', color: 'var(--ink)', margin: '0 0 20px' }}>
            Siap coba<br />
            <span style={{ color: 'var(--primary)' }}>SansMail?</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--steel)', margin: '0 0 36px', lineHeight: 1.6 }}>
            Mulai generate email sementara dalam hitungan detik. Order license key via WhatsApp, langsung aktif.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'var(--primary)', color: '#fff', textDecoration: 'none' }}
            >
              <MessageCircle size={15} />
              Order via WhatsApp
            </a>
            <Link
              to="/access"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'var(--charcoal)', textDecoration: 'none', border: '1px solid var(--hairline-strong)', background: 'transparent' }}
            >
              Sudah punya license?
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right — Vertical Marquee (desktop only) */}
        {!isMobile && (
          <div ref={marqueeRef} style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
            <VerticalMarquee speed={18}>
              {marqueeItems.map((item, i) => (
                <div
                  key={i}
                  className="marquee-item"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, letterSpacing: '-1px', color: 'var(--ink)', padding: '14px 0', lineHeight: 1.1, opacity: 0.3 }}
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, var(--canvas), transparent)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--canvas), transparent)', pointerEvents: 'none', zIndex: 10 }} />
          </div>
        )}

      </div>
    </section>
  )
}
