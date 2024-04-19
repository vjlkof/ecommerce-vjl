import Link from "next/link";

import FooterMenu from "@/components/footer/footer-menu";
import LogoSquare from "@/components/logo-square";
import { mapMenu } from "@/lib/constants";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024;
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  const menu = Array.from(mapMenu.values());
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="w-full flex-shrink-0 py-5 px-1 md:px-5 lg:px-6 text-sm text-neutral-500 dark:text-neutral-400 bottom-0">
      <div className="flex w-full flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link
            className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
            href="/"
          >
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="flex w-full flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            Todos los derechos reservados.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Diseñado en Buenos Aires</p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Creado por :) VictorJLop
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
