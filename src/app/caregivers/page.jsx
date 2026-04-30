import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Award, ShieldCheck, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/db";
import { careServices } from "@/data/careServices";

export const metadata = {
  title: "Our Caregivers | Care.xyz",
  description: "Browse our list of trusted, verified, and experienced caregivers.",
};

export const dynamic = 'force-dynamic';

export default async function CaregiversPage() {
  const { db } = await connectToDatabase();
  const caregivers = await db.collection('caregivers').find({}).toArray();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter mb-6">
            Meet Our <span className="text-tertiary">Caregivers</span>
          </h1>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
            Every caregiver on our platform is strictly vetted, experienced, and deeply compassionate. Browse their profiles and read reviews from other families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caregivers.map((caregiver) => {
            const specialtyInfo = careServices.find(s => s.id === caregiver.specialty);
            
            return (
              <div key={caregiver._id.toString()} className="group bg-surface-container-low rounded-[2.5rem] p-6 border border-outline-variant/10 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                  <Image
                    src={caregiver.image}
                    alt={caregiver.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-black text-on-surface">{caregiver.rating || "New"}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-on-surface font-headline">{caregiver.name}</h3>
                    <ShieldCheck size={20} className="text-green-500" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm">
                    <Award size={16} />
                    <span>{caregiver.experience} Experience</span>
                  </div>

                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                    {caregiver.bio}
                  </p>

                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-tertiary-container/30 text-tertiary font-bold text-[10px] uppercase tracking-widest rounded-full">
                        {specialtyInfo?.title || caregiver.specialty}
                      </span>
                    </div>
                    
                    <Link href={`/caregivers/${caregiver._id.toString()}`} className="w-full py-4 rounded-2xl bg-surface-container text-on-surface font-bold flex justify-center items-center gap-2 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      View Profile
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
      <Footer />
    </>
  );
}
