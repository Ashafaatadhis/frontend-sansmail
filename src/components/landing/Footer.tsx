import { Link } from 'react-router-dom'
import { navLinks } from './data'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--brand-navy)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/sansmail-2.svg" alt="SansMail" style={{ height: 58, width: 'auto' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026</span>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <Link to="/access" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Masuk</Link>
        </div>
      </div>
    </footer>
  )
}
