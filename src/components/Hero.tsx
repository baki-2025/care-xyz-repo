"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const caregivers = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCcflQdP7dDCWy8lyuOW8tV_911ks7xTO7NEk5a9gJY14Q-A5oW5nJQMX75z8N1aJEjkRVnrdByF7lS8t9MfGSsVGUcYAi_whUPrJK7teZCvumfhwHWnui80jUjmbtFgKmOuplfoObfrXH8SIN7dzJ_WW7-T5I1Fh46m9dEbkvXvU0VqlHCpy2VOpa2OBCYWJsaqKwiCAMrn-CK1b_RCWR3EfHLvy09-QWttuIp3vijgJ3t8Al7XjhUW1rLsYjuNP28pE5lqNxxsg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEWAvw0npfdtejWQqRL53aPQ8fLRYW8klpja0IMNocvsZ34X3JI2P1XUMLwad_NDzDPQwgL2eE13ihthtrMs8vAd5h5LmKJRPuR60KQh19g6TJTLFdk10bECRt2K-cKxtT1M_bC3PwZ0GJbPTpNDdDe9dYG_nz8B3xsKwfVyI2WMkBRKxJv8FJJEmxEFIt6uwtXgXVOAJwZunzSTqDdFOtk95qB1DcNXPiCc1K9aEGvf4-qgCv5tCHEVvbxAX5WAY9zL4WCAKx6A",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIwRnRi4DRpW6sHTO8dMMPmIzSTwy58o2Q8_Vvs9atWBR8D6vHTkTz4rHgJwnrgmAhSr55SOaX3vEQvh2eNPvvGZ9KEOEYIXvdBR31K0qiaYVAtwACsn_79lx8uLc7xbB5IdAd3wlRjX8zjEHMLsSqe3tOojL-ix1zwrh7YpBFNhaEpjAlvIrb6gHVFCqvkuLqNnvmDFYiX_iMG-hySMtqfsxeTlNUSdZBVrO_vIjF-A9MJE8t2P7OMP0oqKOWMhnXmgS2tp6L1w",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 lg:px-8 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-12 xl:col-span-6 z-10 text-center xl:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-sm font-semibold mb-6 ring-1 ring-primary/10">
              Verified Caregiving Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight mb-6 tracking-tight font-headline">
              Compassion <br />{" "}
              <span className="text-on-primary-container bg-primary-container/20 px-2 rounded-lg">
                at the Heart
              </span>{" "}
              of Care.
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 max-w-lg mx-auto xl:mx-0 leading-relaxed font-body">
              We connect you with certified, empathetic caregivers who treat
              your loved ones like their own family. Professional care
              delivered with a personal touch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-on-primary rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Find a Caretaker <ArrowRight size={20} />
                </motion.button>
              </Link>
              <button className="px-8 py-4 bg-surface-container-lowest text-primary rounded-xl text-lg font-bold border border-outline-variant hover:bg-surface-container transition-all">
                Browse Services
              </button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start">
              <div className="flex -space-x-4">
                {caregivers.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden relative"
                  >
                    <img
                      src={src}
                      alt={`Caregiver ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant font-medium">
                Joined by <span className="text-primary font-bold">2,400+</span> certified experts
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Images/Gallery */}
        <div className="lg:col-span-12 xl:col-span-6 relative h-[600px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Background Blob/Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary-container/20 blur-[100px] rounded-full" />
            
            <div className="w-full h-full relative overflow-hidden rounded-[3rem] shadow-3xl ring-1 ring-primary/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUK2hbs6_nCvN2ACj14BIQuVpJyjU0GXCfpaIjVo64uYK0Qbv4x7s246SnDD0yxlEqMxv84Ay5kqBLRVeGB1styT2bPeNIqI2sbzJ38aSd3EPTFlitYMnrnudSkWbNm5m9XdpH4Bg9fngERHqOrLrPNuwp83lvz2SEV1F7dTo35fCqi3pVW73dXyrvHg_j7wCNALk-PmfPmq5WhUBGpMbhFXcnssQFPvQAGPA9lFLwKMX1hupafdPxtGe5NczWjNCEC-GLVF9jCg"
                alt="Caregiver and elderly lady"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 p-6 bg-surface-container-lowest rounded-2xl shadow-xl max-w-xs border border-outline-variant/30 backdrop-blur-sm"
            >
              <div className="flex gap-2 items-center text-tertiary mb-2">
                <Star size={18} fill="currentColor" />
                <span className="font-extrabold text-primary">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic">
                "The level of attention and genuine care was beyond what we expected for our mother."
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
