import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Care.xyz | Trusted Baby Sitting & Elderly Care",
  description: "Care.xyz is a web application helping users book reliable and trusted care services for children, elderly, or sick people at home. Accessible, secure, and professional.",
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
