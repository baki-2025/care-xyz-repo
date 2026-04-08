import React from "react";
import LoginNavbar from "@/components/login/LoginNavbar";
import RegisterEditorial from "@/components/register/RegisterEditorial";
import RegisterForm from "@/components/register/RegisterForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Join Care.IO - Create Your Account",
  description: "Begin your journey to better care. Join over 10,000 families finding peace of mind through our curated sanctuary of professional caregivers.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <LoginNavbar />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-surface-container-lowest rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant/10 min-h-[800px]">
          {/* Left Side: Editorial Brand Visual */}
          <RegisterEditorial />
          
          {/* Right Side: Registration Form */}
          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
