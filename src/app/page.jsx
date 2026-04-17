import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Care.xyz | Reliable Home Care for Your Loved Ones",
  description: "Easily book trusted caregivers for children, elderly, and those in need. Care.xyz provides professional, empathetic, and accessible caregiving services across Bangladesh.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MissionSection />
        <ServicesBento />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
