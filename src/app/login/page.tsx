import React from "react";
import LoginNavbar from "@/components/login/LoginNavbar";
import LoginEditorial from "@/components/login/LoginEditorial";
import LoginForm from "@/components/login/LoginForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Login | Care.IO",
  description: "Log in to your Care.IO account to manage your care network.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <LoginNavbar />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10 h-auto md:h-[800px]">
          {/* Left Side: Editorial Content */}
          <LoginEditorial />
          
          {/* Right Side: Login Form */}
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
