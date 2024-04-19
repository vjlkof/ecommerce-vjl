"use client";
import ReactPaginate, { ReactPaginatePageChange } from "react-paginate";
import { useState, useEffect } from "react";
import { ProductForPaginator, Product } from "@/lib/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export default function Pagination({
  paginatorData,
}: {
  paginatorData: ProductForPaginator;
}) {
  const [pageCount, setPageCount] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setPageCount(
      Math.ceil(paginatorData.resultQtty / Number(paginatorData.limit))
    );
  }, [paginatorData.limit, paginatorData.resultQtty]);

  const classNames =
    "bg-white text-blue-500 hover:bg-blue-100 px-2 py-1 border cursor-pointer rounded-md appearance-none focus:outline-none focus:ring focus:border-purple-300 list-none";

  const handlePageClick = (event: ReactPaginatePageChange) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", event.selected + 1);
    const newParam2 = createUrl(pathname, newParams);
    router.push(newParam2);
  };

  return (
    <>
      {paginatorData.resultQtty > 0 ? (
        <>
          <ReactPaginate
            nextLabel="Siguiente >"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="< Anterior"
            pageClassName={classNames}
            previousClassName={classNames}
            nextClassName={classNames}
            containerClassName="flex items-center justify-center mt-8 mb-4"
            activeClassName="bg-blue-200 appearance-none focus:outline-none focus:ring focus:border-blue-300 list-none shadow-md"
            renderOnZeroPageCount={null}
            disabledClassName="cursor-default bg-white text-gray-200 px-2 py-1 border rounded-md appearance-none list-none"
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
