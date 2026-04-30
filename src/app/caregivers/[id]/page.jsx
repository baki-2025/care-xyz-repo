import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Award, ShieldCheck, Clock, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import connectToDatabase from "@/lib/db";
import { careServices } from "@/data/careServices";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const { db } = await connectToDatabase();
    const caregiver = await db.collection('caregivers').findOne({ _id: new ObjectId(resolvedParams.id) });
    if (!caregiver) return { title: "Caregiver Not Found | Care.xyz" };
    return { title: `${caregiver.name} - Caregiver Profile | Care.xyz` };
  } catch {
    return { title: "Caregiver | Care.xyz" };
  }
}

export default async function CaregiverDetailPage({ params }) {
  const resolvedParams = await params;
  
  if (!ObjectId.isValid(resolvedParams.id)) {
    notFound();
  }

  const { db } = await connectToDatabase();
  const caregiverId = new ObjectId(resolvedParams.id);
  
  const [caregiver, reviews] = await Promise.all([
    db.collection('caregivers').findOne({ _id: caregiverId }),
    db.collection('reviews').find({ caregiverId }).sort({ createdAt: -1 }).toArray()
  ]);

  if (!caregiver) {
    notFound();
  }

  const specialtyInfo = careServices.find(s => s.id === caregiver.specialty);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        
        {/* Profile Header Card */}
        <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 shadow-sm border border-outline-variant/10 mb-12">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-surface flex-shrink-0 shadow-lg">
              <Image 
                src={caregiver.image} 
                alt={caregiver.name} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter">
                    {caregiver.name}
                  </h1>
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
                <span className="inline-block px-4 py-1.5 bg-tertiary-container/30 text-tertiary font-bold text-xs uppercase tracking-widest rounded-full">
                  {specialtyInfo?.title || caregiver.specialty}
                </span>
              </div>

              <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
                {caregiver.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Star size={20} className="fill-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Rating</p>
                    <p className="font-black text-on-surface">{caregiver.rating || "New"} / 5.0</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-outline-variant/20 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Experience</p>
                    <p className="font-black text-on-surface">{caregiver.experience}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Reviews Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-black font-headline text-primary tracking-tight">Reviews ({reviews.length})</h2>
            
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="bg-surface-container p-8 rounded-[2rem] text-center border border-outline-variant/10 text-on-surface-variant font-medium">
                  No reviews yet. Be the first to leave one!
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id.toString()} className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center">
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{review.userName || "Anonymous"}</p>
                          <p className="text-xs text-on-surface-variant">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-outline-variant"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-on-surface-variant font-medium leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ReviewForm caregiverId={caregiver._id.toString()} />
            
            <div className="bg-primary text-on-primary p-8 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <ShieldCheck size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black font-headline mb-4">Book this service</h3>
                <p className="font-medium text-on-primary/80 mb-6 text-sm">
                  Want to hire a professional from our {specialtyInfo?.title || 'care'} team? Book the service now.
                </p>
                <Link 
                  href={`/booking/${caregiver.specialty}`}
                  className="w-full inline-block text-center py-4 rounded-full bg-on-primary text-primary font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all"
                >
                  Book Service
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
