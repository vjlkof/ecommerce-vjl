"use client";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import OpenFavorite from "./open-favorite";
import CloseFavorite from "./close-favorite";
import { DeleteFavoriteButton } from "./delete-favorite-button";
import { FavoriteItem } from "@/lib/utils/types";
import { useAppSelector } from "@/lib/hooks";

export default function Favorite() {
  const [favoriteIsOpen, setFavoriteIsOpen] = useState(false);
  const openFavorite = () => setFavoriteIsOpen(true);
  const closeFavorite = () => setFavoriteIsOpen(false);
  const favorites: FavoriteItem[] = useAppSelector(
    (state) => state.favorites.favorites
  ) as FavoriteItem[];

  return (
    <>
      <button aria-label="Abrir favoritos" onClick={openFavorite}>
        <OpenFavorite />
      </button>
      <Transition show={favoriteIsOpen}>
        <Dialog onClose={closeFavorite} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300 transform origin-top scale-y-0"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition-all ease-in-out duration-200 transform origin-top scale-y-100"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300 transform origin-top scale-y-0"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition-all ease-in-out duration-200 transform origin-top scale-y-100"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Favoritos</p>

                <button aria-label="Cerrar favoritos" onClick={closeFavorite}>
                  <CloseFavorite />
                </button>
              </div>
              {!favorites || favorites.length <= 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <HeartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Favoritos esta vacio
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {favorites.map((item: FavoriteItem, index) => {
                      return (
                        <li
                          key={index}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="flex w-full flex-row gap-1 justify-between items-center py-4">
                            <Link
                              href={`/product-detail/${item.url_key}?id=${item.id}`}
                              onClick={closeFavorite}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.name}
                                  src={item.thumbnail.url}
                                />
                              </div>
                              <div className="flex flex-1 flex-col text-base justify-center">
                                <span className="leading-tight ">
                                  {item.name}
                                </span>
                              </div>
                            </Link>
                            <div className="">
                              <DeleteFavoriteButton item={item} />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
