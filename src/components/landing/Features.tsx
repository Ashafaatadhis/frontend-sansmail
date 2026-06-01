import { useEffect, useRef } from "react";
import { Zap, Globe, Clock, Mail, Shield } from "lucide-react";

interface BentoCardProps {
  span?: string;
  title: string;
  blurb: string;
  meta: string;
  icon: React.ReactNode;
}

function BentoCard({ span = "", title, blurb, meta, icon }: BentoCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/30 hover:bg-white/8 backdrop-blur-sm ${span}`}
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
            {icon}
          </div>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 9999,
            padding: "2px 8px",
            flexShrink: 0,
          }}
        >
          {meta}
        </span>
      </header>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.55)",
          margin: 0,
        }}
      >
        {blurb}
      </p>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(86,69,212,0.15), transparent 70%)",
        }}
      />
    </article>
  );
}

function SpiralBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const SIZE = 620;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = 700;
    const DOT = 1.5;
    const CENTER = SIZE / 2;
    const MAX_R = CENTER - 8;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", "#ffffff");

      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute("values", `${DOT * 0.5};${DOT * 1.3};${DOT * 0.5}`);
      animR.setAttribute("dur", "3s");
      animR.setAttribute("begin", `${(frac * 3).toFixed(3)}s`);
      animR.setAttribute("repeatCount", "indefinite");
      c.appendChild(animR);

      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", "0.15;0.7;0.15");
      animO.setAttribute("dur", "3s");
      animO.setAttribute("begin", `${(frac * 3).toFixed(3)}s`);
      animO.setAttribute("repeatCount", "indefinite");
      c.appendChild(animO);

      svg.appendChild(c);
    }

    ref.current.innerHTML = "";
    ref.current.appendChild(svg);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35"
      style={{
        maskImage:
          "radial-gradient(circle at center, white, rgba(255,255,255,0.1) 60%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, white, rgba(255,255,255,0.1) 60%, transparent 75%)",
        mixBlendMode: "screen",
      }}
    >
      <div ref={ref} />
    </div>
  );
}

const features = [
  {
    title: "Inbox Realtime via WebSocket",
    blurb:
      "Email masuk langsung muncul tanpa refresh. Tidak ada polling, tidak ada delay — murni event-driven via WebSocket.",
    meta: "Realtime",
    icon: <Zap size={16} />,
    span: "md:col-span-4 md:row-span-2",
  },
  {
    title: "Domain Custom Sendiri",
    blurb:
      "Set DNS records dan domain kamu langsung aktif. Email masuk ke inbox yang sama.",
    meta: "Domain",
    icon: <Globe size={16} />,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Auto-Expire 60 Menit",
    blurb:
      "Email otomatis terhapus setelah 30 hari. Tidak perlu hapus manual, privasi terjaga.",
    meta: "TTL",
    icon: <Clock size={16} />,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Multi Email per Session",
    blurb:
      "Generate banyak alamat email berbeda dalam satu session. Tidak ada batasan jumlah.",
    meta: "Unlimited",
    icon: <Mail size={16} />,
    span: "md:col-span-3 md:row-span-1",
  },
  {
    title: "Domain Shared & Privasi Terjamin",
    blurb:
      "Pakai domain bawaan kami langsung tanpa setup. Tidak ada data pribadi yang disimpan permanen.",
    meta: "Privacy",
    icon: <Shield size={16} />,
    span: "md:col-span-3 md:row-span-1",
  },
];

export default function Features() {
  return (
    <section
      id="fitur"
      className="relative w-full"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      {/* Dark background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #0a1530 40%, #0d0d2b 100%)",
        }}
      />

      <div
        className="relative z-10 mx-auto w-full max-w-5xl"
        style={{ padding: "48px 24px" }}
      >
        <SpiralBackground />

        {/* Header */}
        <div
          className="relative border-b border-white/10 pb-5"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "#c4b5fd",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            FITUR
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 3.5vw, 34px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              color: "#fff",
              margin: "0 0 8px",
            }}
          >
            Semua yang kamu butuhkan
          </h2>
          <p
            style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}
          >
            Ringan, cepat, dan langsung bisa dipakai. Tanpa setup yang rumit.
          </p>
        </div>

        {/* Bento grid */}
        <div className="relative grid auto-rows-[minmax(80px,auto)] grid-cols-1 gap-2 md:grid-cols-6">
          {features.map((f, i) => (
            <BentoCard
              key={i}
              span={f.span}
              title={f.title}
              blurb={f.blurb}
              meta={f.meta}
              icon={f.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
