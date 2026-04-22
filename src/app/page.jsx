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
  keywords: ["home care", "caregivers", "elderly care", "child care", "Bangladesh", "booking", "professional caregivers"],
  openGraph: {
    title: "Care.xyz | Reliable Home Care for Your Loved Ones",
    description: "Easily book trusted caregivers for children, elderly, and those in need. Care.xyz provides professional, empathetic, and accessible caregiving services across Bangladesh.",
    url: "https://care.xyz",
    siteName: "Care.xyz",
    images: [
      {
        url: "/assets/banner/home-banner.jpg", // Assuming there's a banner image
        width: 1200,
        height: 630,
        alt: "Care.xyz Home Care Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care.xyz | Reliable Home Care for Your Loved Ones",
    description: "Easily book trusted caregivers for children, elderly, and those in need. Care.xyz provides professional, empathetic, and accessible caregiving services across Bangladesh.",
    images: ["/assets/banner/home-banner.jpg"],
  },
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
