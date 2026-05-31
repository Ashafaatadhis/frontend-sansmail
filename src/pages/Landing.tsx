import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import Faq from "../components/landing/Faq";
import CtaBanner from "../components/landing/CtaBanner";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, system-ui, "Segoe UI", sans-serif',
        background: "var(--canvas)",
        color: "var(--ink)",
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <CtaBanner />
        <Footer />
      </main>
    </div>
  );
}
