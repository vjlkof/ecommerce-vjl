import { Suspense } from "react";
import FilterItem from "./filterItem";
import { CategoriesFilterItem } from "@/lib/utils/types";
import Loading from "@/app/loading";

export type ListItem = CategoriesFilterItem;

export default function FilterCategories({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <nav className="max-sm:w-full">
          <h3 className="font-bold dark:text-neutral-400">{title}</h3>
          <ul className="flex flex-col w-full pl-3">
            {list.map((item: ListItem, i) => (
              <FilterItem key={i} item={item} />
            ))}
          </ul>
        </nav>
      </Suspense>
    </>
  );
}
