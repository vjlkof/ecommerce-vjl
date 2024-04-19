import Grid from "@/components/grid/grid";
import ProductGridItems from "@/components/product/product-grid-items";
import { Product, ProductForPaginator } from "@/lib/utils/types";
import getData from "@/lib/utils/apiCall";
import urlBuilder from "@/lib/utils/urlBuilder";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { defaultSort, sorting } from "@/lib/constants";
import Pagination from "@/components/product/pagination";
import { createUrl } from "@/lib/utils";

export const metadata = {
  title: "Product list",
  description: "Lita todos los productos para la comunidad mas grande de vinos",
};

export default async function PageGallery({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    sort: rawSort,
    q,
    num_min,
    num_max,
    category,
    page,
  } = searchParams ?? {};

  const sortObj = sorting.find((item) => item.slug === rawSort) || defaultSort;
  const sort: string | null = (rawSort as string) || sortObj.slug;
  const searchValue = q;

  const params = new URLSearchParams();
  page && params.set("page", page as string);
  sort && params.set("sort", sort);
  searchValue && params.set("q", searchValue as string);
  num_min && params.set("num_min", num_min as string);
  num_max && params.set("num_max", num_max as string);
  category && params.set("category", category as string);

  createUrl("product", params);
  const productForPaginator = (await getData(
    "product",
    urlBuilder("product", "", params.toString())
  )) as ProductForPaginator;

  const resultsText =
    productForPaginator.resultQtty > 1 ? "resultados " : "resultado ";
  const products = productForPaginator.products as Product[];
  const totalpages =
    productForPaginator.resultQtty % Number(productForPaginator.limit) > 0
      ? Math.trunc(
          productForPaginator.resultQtty / Number(productForPaginator.limit)
        ) + 1
      : Math.trunc(
          productForPaginator.resultQtty / Number(productForPaginator.limit)
        );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <p className="sm:mx-0 sm:mb-6">
          {products.length === 0
            ? "No hay resultados "
            : `${productForPaginator.resultQtty} ${resultsText}`}
          {searchValue && (
            <span className="font-bold">{`para "${searchValue}"`}</span>
          )}
        </p>
        {products.length > 0 ? (
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
        ) : null}
        <div className="mt-5 flex w-full justify-center">
          <Pagination paginatorData={productForPaginator} />
        </div>
      </Suspense>
    </>
  );
}
