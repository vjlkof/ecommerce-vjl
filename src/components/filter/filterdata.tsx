import { Suspense } from "react";
import Loading from "@/app/loading";
import { CategoriesFilterItem } from "@/lib/utils/types";
import getData from "@/lib/utils/apiCall";
import urlBuilder from "@/lib/utils/urlBuilder";
import { convertToPath } from "@/lib/utils";
import Filters from "./filters";

export default async function FilterData() {
  const result = await getData("category", urlBuilder("category"));
  const categories = convertToPath(result) as CategoriesFilterItem[];

  return (
    <Suspense fallback={<Loading />}>
      <Filters categories={categories} />
    </Suspense>
  );
}
