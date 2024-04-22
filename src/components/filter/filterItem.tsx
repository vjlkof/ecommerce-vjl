"use client";

import { Suspense, useEffect, useState } from "react";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoriesFilterItem } from "@/lib/utils/types";
import Loading from "@/app/loading";

export default function FilterItem({ item }: { item: CategoriesFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  const active = selectedCategories.includes(item.path);
  const newParams = new URLSearchParams(searchParams);
  newParams.delete("page");

  useEffect(() => {
    const categoriesInParams: string | null = searchParams.get("category");
    setSelectedCategories(() =>
      !categoriesInParams ? [] : categoriesInParams.split(",")
    );
  }, [searchParams]);

  function onSelectCategory(category: string) {
    let newSelectedCategories: string[] = [];

    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter(
        (categoryItem) => categoryItem !== category
      );
    } else {
      newSelectedCategories = [...selectedCategories, item.path];
    }

    setSelectedCategories(() => [...newSelectedCategories]);

    if (newSelectedCategories && newSelectedCategories.length > 0) {
      newParams.set("category", newSelectedCategories.join(","));
    } else {
      newParams.delete("category");
    }

    const newURL = createUrl(pathname, newParams);
    router.push(newURL);
  }

  return (
    <Suspense fallback={<Loading />}>
      <label
        className="mt-2 flex items-center gap-2 justify-items-center cursor-pointer dark:border-neutral-800 dark:bg-black/70 dark:text-white"
        htmlFor={item.path}
      >
        <input
          type="checkbox"
          id={item.path}
          key={item.path}
          className="flex text-black dark:text-white  dark:border-neutral-800"
          onChange={() => onSelectCategory(item.path)}
          checked={active}
        ></input>
        {item.title.charAt(0).toUpperCase() + item.title.slice(1, 9999)}
      </label>
    </Suspense>
  );
}
