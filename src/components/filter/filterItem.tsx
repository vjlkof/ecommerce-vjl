"use client";

import clsx from "clsx";
import { Suspense } from "react";
import { createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CategoriesFilterItem } from "@/lib/utils/types";
import Loading from "@/app/loading";

export default function FilterItem({ item }: { item: CategoriesFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") === item.path;
  const DynamicTag = active ? "p" : Link;
  const newParams = new URLSearchParams(searchParams);
  newParams.set("category", item.path);
  newParams.delete("page");
  const newParam2 = createUrl(pathname, newParams);

  return (
    <Suspense fallback={<Loading />}>
      <li className="mt-2 flex text-black dark:text-white" key={item.title}>
        <DynamicTag
          href={newParam2}
          className={clsx(
            "w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
            {
              "underline underline-offset-4": active,
            }
          )}
        >
          {item.title}
        </DynamicTag>
      </li>
    </Suspense>
  );
}
