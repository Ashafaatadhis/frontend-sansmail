import { KeyRound, Sparkles, Inbox } from "lucide-react";
import type React from "react";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className="relative rounded-2xl p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
    style={{
      background: "var(--canvas)",
      border: "1px solid var(--hairline-soft)",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor =
        "var(--hairline-soft)";
    }}
  >
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
      style={{ background: "var(--surface)", color: "var(--primary)" }}
    >
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--ink)" }}>
      {title}
    </h3>
    <p
      className="mb-5 text-sm leading-relaxed"
      style={{ color: "var(--steel)" }}
    >
      {description}
    </p>
    <ul className="space-y-2.5">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div
            className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(86,69,212,0.08)" }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--primary)" }}
            />
          </div>
          <span className="text-sm" style={{ color: "var(--charcoal)" }}>
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const stepsData = [
  {
    icon: <KeyRound className="h-6 w-6" />,
    title: "Masukkan License Key",
    description:
      "Login dengan license key yang kamu beli. Langsung masuk tanpa perlu daftar akun apapun.",
    benefits: [
      "Tidak perlu email atau password",
      "Aktivasi instan",
      "Satu key, akses semua fitur",
    ],
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Generate Email",
    description:
      "Pilih domain bawaan atau domain custom kamu, klik generate. Alamat email siap dalam detik.",
    benefits: [
      "Domain shared tersedia langsung",
      "Bisa pakai domain sendiri",
      "Prefix custom atau random",
    ],
  },
  {
    icon: <Inbox className="h-6 w-6" />,
    title: "Terima Email Realtime",
    description:
      "Email masuk langsung muncul di inbox tanpa perlu refresh. WebSocket handle semuanya.",
    benefits: [
      "Live update tanpa polling",
      "Auto-expire 60 menit",
      "Baca isi email lengkap",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="w-full"
      style={{
        background: "var(--canvas)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="mx-auto max-w-4xl w-full"
        style={{ padding: "96px 24px" }}
      >
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            CARA KERJA
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Mulai dalam 3 langkah
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Dari license key sampai inbox realtime dalam kurang dari satu menit.
          </p>
        </div>

        {/* Step indicators + connecting line */}
        <div className="relative mx-auto mb-6 w-full">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-primary/30"
          />
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-9 w-9 items-center justify-center justify-self-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
