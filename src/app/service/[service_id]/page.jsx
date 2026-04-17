import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { careServices } from "@/data/careServices";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = careServices.find((s) => s.id === resolvedParams.service_id);
  if (!service) return { title: "Service Not Found - Care.xyz" };
  
  return {
    title: `${service.title} | Care.xyz`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = careServices.find((s) => s.id === resolvedParams.service_id);
  
  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-6 max-w-5xl mx-auto min-h-screen">
        <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 shadow-sm border border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Box */}
            <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-outline-variant/10">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Content Box */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-on-surface">Service Rates</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 bg-surface-container p-6 rounded-2xl flex items-center space-x-4 border border-outline-variant/10">
                     <div className="p-3 bg-primary/10 rounded-xl text-primary">
                       <Clock size={24} />
                     </div>
                     <div>
                       <p className="text-xs font-black uppercase text-on-surface-variant">Hourly</p>
                       <p className="text-2xl font-black text-on-surface">৳{service.pricePerHour}</p>
                     </div>
                  </div>
                  <div className="flex-1 bg-surface-container p-6 rounded-2xl flex items-center space-x-4 border border-outline-variant/10">
                     <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                       <Clock size={24} />
                     </div>
                     <div>
                       <p className="text-xs font-black uppercase text-on-surface-variant">Daily</p>
                       <p className="text-2xl font-black text-on-surface">৳{service.pricePerDay}</p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-on-surface">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-on-surface-variant font-medium">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link 
                  href={`/booking/${service.id}`}
                  className="w-full inline-flex justify-center items-center py-5 px-8 rounded-2xl bg-primary text-on-primary font-black uppercase tracking-widest text-sm hover:opacity-90 hover:-translate-y-1 transition-all shadow-xl shadow-primary/20"
                >
                  Book Service Now
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
