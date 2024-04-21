"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ListItem } from "./sortList";
import { FilterItem } from "./item";

export default function SortItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(list[0].title);
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

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(() => listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative w-full sm:w-[190px]" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex items-center justify-between rounded border border-black/30 px-2 py-1 text-sm dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>
      {openSelect && (
        <ul
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute w-full sm:w-[190px] z-40 rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
