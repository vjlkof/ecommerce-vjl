"use client";
import clsx from "clsx";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export default function FilterPrice() {
  const [inputMin, setInputMin] = useState("");
  const [inputMax, setInputMax] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function onClickPrice(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (inputMin) {
      newParams.set("num_min", inputMin);
      setInputMin("");
    }
    if (inputMax) {
      newParams.set("num_max", inputMax);
      setInputMax("");
    }
    const newURL = createUrl(pathname, newParams);
    router.push(newURL);
  }

  const handleInputMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMin(event.target.value);
  };

  const handleInputMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMax(event.target.value);
  };

  return (
    <>
      <h3 className="font-bold">Precio</h3>
      <form>
        <div className="flex justify-start md:justify-between gap-2">
          <label className="flex flex-col text-center font-bold">
            <input
              type="number"
              id="num_min"
              name="num_min"
              className="p-1 w-24 h-8 font-normal text-center rounded-lg border bg-white dark:bg-black relative border-neutral-300 dark:border-neutral-800"
              onChange={handleInputMin}
              placeholder={searchParams?.get("num_min") || ""}
              value={inputMin}
            ></input>
            Mínimo
          </label>
          <label className="flex flex-col text-center font-bold">
            <input
              type="number"
              id="num_max"
              name="num_max"
              className="p-1 w-24 h-8 font-normal text-center rounded-lg border bg-white dark:bg-black relative border-neutral-300 dark:border-neutral-800"
              onChange={handleInputMax}
              placeholder={searchParams?.get("num_max") || ""}
              value={inputMax}
            ></input>
            Máximo
          </label>
          <button
            type="submit"
            className={
              !inputMin.trim() && !inputMax.trim() ? "" : "hover:cursor-pointer"
            }
            aria-label="Aplicar"
            disabled={!inputMin.trim() && !inputMax.trim()}
            onClick={(event) => onClickPrice(event)}
          >
            <ArrowRightCircleIcon
              className={clsx(
                "h-8 w-8 dark:text-neutral-300 ",
                !inputMin.trim() && !inputMax.trim()
                  ? "text-gray-300"
                  : "text-blue-600"
              )}
            />
          </button>
        </div>
      </form>
    </>
  );
}
