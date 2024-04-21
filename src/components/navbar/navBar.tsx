import Cart from "@/components/cart/cart";
import OpenFavorite from "@/components/favorite/open-favorite";
import OpenCart from "@/components/cart/open-cart";
import LogoSquare from "@/components/logo-square";
import { mapMenu } from "@/lib/constants";
import { MenuItem } from "@/lib/utils/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import Favorite from "@/components/favorite/favorite";
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = Array.from(mapMenu.values());

  return (
    <nav className="relative flex items-center justify-between py-5 px-1 md:px-5 lg:px-6">
      <div className="relative flex w-full flex-col gap-y-4">
        <div className="flex w-full items-center">
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end gap-2 md:w-1/3">
            <Suspense fallback={<OpenFavorite />}>
              <Favorite />
            </Suspense>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
        <hr className="hidden md:block mx-2" />
        {menu.length ? (
          <div className="hidden md:flex w-full justify-center">
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map(
                (item: MenuItem) =>
                  item.show && (
                    <li
                      key={item.title}
                      className="border-r-2 last:border-r-0 pr-8"
                    >
                      <Link
                        href={item.path}
                        className="text-neutral-800 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
