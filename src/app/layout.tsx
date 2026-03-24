import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import AuthGuard from "@/src/components/AuthGuard/AuthGuard";
import "@/src/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AbeloHost title",
  description: "Product catalog with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthGuard>
      </body>
    </html>
  );
}
