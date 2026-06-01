import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button";
import { navLinks, WA_URL } from "./data";

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return isMobile;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const isDark = useIsDark();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const handleMobileNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Di atas hero (navy bg) → teks putih. Setelah scroll → teks gelap
  const onDark = !scrolled && !mobileOpen;

  return (
    <header
      ref={menuRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? isDark
            ? "rgba(15,20,38,0.92)"
            : "rgba(255,255,255,0.92)"
          : mobileOpen
            ? "var(--brand-navy)"
            : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--hairline)"
          : mobileOpen
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src="/sansmail-2.svg"
            alt="SansMail"
            style={{ height: 58, width: "auto" }}
          />
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  color: onDark ? "rgba(255,255,255,0.75)" : "var(--charcoal)",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop actions */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AnimatedThemeToggleButton type="horizontal" />
            <Link
              to="/access"
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.25s",
                color: onDark ? "rgba(255,255,255,0.85)" : "var(--ink)",
                border: onDark
                  ? "1px solid rgba(255,255,255,0.2)"
                  : isDark
                    ? "1px solid var(--hairline)"
                    : "1px solid var(--hairline-strong)",
                background: "transparent",
              }}
            >
              Masuk
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "7px 18px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                background: "var(--primary)",
                color: "#fff",
                textDecoration: "none",
                boxShadow: onDark ? "0 0 20px rgba(86,69,212,0.4)" : "none",
                transition: "box-shadow 0.25s",
              }}
            >
              Order Sekarang
            </a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: onDark ? "#fff" : "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              transition: "color 0.25s",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        )}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden", background: "var(--brand-navy)" }}
          >
            <div style={{ padding: "8px 24px 24px" }}>
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleMobileNav(e, l.href)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: "flex",
                    padding: "13px 0",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.04 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: 4,
                  }}
                >
                  <AnimatedThemeToggleButton type="horizontal" />
                </div>
                <Link
                  to="/access"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "11px 16px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "center",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  Masuk
                </Link>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "11px 18px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "center",
                    background: "var(--primary)",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Order Sekarang
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
