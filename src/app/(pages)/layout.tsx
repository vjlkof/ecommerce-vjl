import { ReactNode, Suspense } from "react";
import BreadCrum from "@/components/breadCrum";
import Loading from "@/app/loading";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <BreadCrum />
      {children}
    </Suspense>
  );
}
