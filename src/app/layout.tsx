import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Challenge Woki",
  description: "Discover detailed letters from your favorite movies on our site. Explore a unique collection of reviews, plot details and movie trivia. Find new recommendations and relive classics with our movie cards, designed for passionate moviegoers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#111]`}>
        <Providers>
          <Header />
          {children}
          <footer className="pt-10 bg-[#fff] text-[#111] p-4 text-center dark:bg-[#111] dark:text-[#fff]">
            <p>© 2024 All rights reserved by Movieflix</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
