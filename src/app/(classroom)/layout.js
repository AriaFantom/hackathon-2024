import { Inter, Koulen } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Home from "@/components/layout/dashboard/home";
import DashNavbar from "@/components/layout/dashboard/navbar";

const inter = Koulen({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-blue-100">
          <DashNavbar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
