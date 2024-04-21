"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import FilterCategories from "./filterCategories";
import ClearFilter from "./clearFilter";
import FilterPrice from "./filterPrice";
import Loading from "@/app/loading";
import { FunnelIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CategoriesFilterItem } from "@/lib/utils/types";

export default function Filters({
  categories,
}: {
  categories: CategoriesFilterItem[];
}) {
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <section className="relative flex-col max-md:py-4">
        <div className="max-sm:flex max-sm:justify-center max-sm:w-full sm:mx-1 sm:mb-6">
          <button
            type="button"
            className="flex sm:hidden"
            onClick={() => {
              setOpenSelect(!openSelect);
            }}
          >
            <h2 className="max-sm:text-blue-600 font-bold">Filtrar por</h2>
            <FunnelIcon className="h-6 w-6 text-blue-600" />
          </button>
          <h2 className="font-bold max-sm:hidden">Filtrar por</h2>
        </div>
        <div
          className={clsx(
            "z-20 w-full max-h-[300px] sm:max-h-[600px] overflow-x-hidden overflow-y-auto px-2 py-4 md:px-4 md:py-8 rounded-lg border bg-white dark:bg-black border-neutral-200 dark:border-neutral-800",
            !openSelect ? "max-sm:hidden" : "max-sm:absolute"
          )}
        >
          <div className="flex flex-col gap-4">
            <Suspense fallback={<Loading />}>
              <ClearFilter />
              <FilterPrice />
              <FilterCategories list={categories} title="Categories" />
            </Suspense>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
