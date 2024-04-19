import Navbar from "../components/navbar/navBar";
import Loading from "./loading";
import Footer from "@/components/footer/footer";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col max-w-[1920px] mx-auto min-h-screen bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <StoreProvider>
          <Navbar />
          <Suspense>
            <main className="flex-1">{children}</main>
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
