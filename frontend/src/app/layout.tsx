import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamHive - Premium OTT Platform",
  description: "Enterprise-grade cinematic streaming experience.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}