import { SortFilterItem } from "@/lib/constants";
import { Suspense } from "react";
import SortItemDropdown from "./sortItemDropdown";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

export default function SortList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <nav className="max-sm:w-full">
        <h3 className="max-sm:text-center text-xs text-neutral-500 dark:text-neutral-400">
          {title}
        </h3>
        <div className="flex w-full justify-end">
          <Suspense fallback={null}>
            <SortItemDropdown list={list} />
          </Suspense>
        </div>
      </nav>
    </>
  );
}
