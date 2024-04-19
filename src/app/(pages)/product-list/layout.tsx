import { ReactNode, Suspense } from "react";
import Filterdata from "@/components/filter/filterdata";
import SortList from "@/components/sort/sortList";
import { sorting } from "@/lib/constants";
import Loading from "./loading";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex w-full flex-col py-5 px-1 md:py-6 md:px-5 lg:px-6">
        <div className="flex sm:justify-end md:mx-1">
          <SortList list={sorting} title="Ordenar por" />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 sm:flex-row md:mx-1 text-black  dark:text-white">
          <div className="order-first w-full flex-none sm:max-w-[280px]">
            <Filterdata />
          </div>
          <div className="order-last min-h-screen w-full md:order-none">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
