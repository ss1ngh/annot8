import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import ShowcaseTitle from "@/components/landing/ShowcaseTitle";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ShowcaseTitle />
      <ShowcaseSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
