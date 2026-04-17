import { Inter, Manrope } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Care.xyz | Trusted Baby Sitting & Elderly Care",
    template: "%s | Care.xyz"
  },
  description: "Care.xyz connects you with reliable, trusted caregivers for children, seniors, and sick individuals. Professional home care services whenever and wherever you need them.",
  keywords: ["baby sitting", "elderly care", "sick care", "home care service", "trusted caregivers"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
