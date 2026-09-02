import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CardCarousel from "@/components/CardCarousel";
import BeyondSection from "@/components/BeyondSection";
import ScatterGallery from "@/components/ScatterGallery";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <CardCarousel />
        <BeyondSection />
        <ScatterGallery />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
