"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ClearFilter() {
  const router = useRouter();
  const pathname = usePathname();

  function onClickClear() {
    router.push(pathname);
  }

  return (
    <>
      <div>
        <button
          type="button"
          className="hover:cursor-pointer text-blue-600"
          aria-label="Limpiar filtro"
          onClick={() => onClickClear()}
        >
          Limpiar filtro
        </button>
      </div>
    </>
  );
}
