"use client";
import clsx from "clsx";
import Image from "next/image";
import Label from "../label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateFavorites,
  initializeFavorite,
} from "@/lib/features/favorite/favoriteSlice";
import { FavoriteItem } from "@/lib/utils/types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  favorite,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  favorite?: boolean;
  label?: {
    id?: number;
    name: string;
    url_key?: string;
    thumbnail?: string;
    discountPercentage?: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favorites.favorites
  ) as FavoriteItem[];

  useEffect(() => {
    dispatch(initializeFavorite());
  }, [dispatch]);

  function handleUpdateFavorite(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(
      updateFavorites({
        id: label?.id,
        name: label?.name,
        url_key: label?.url_key,
        thumbnail: { url: label?.thumbnail },
      })
    );
  }
  return (
    <div
      className={clsx(
        "group relative h-full w-full border bg-white  dark:bg-black",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-cover", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      {label?.discountPercentage ? (
        <Label amount={label.discountPercentage} />
      ) : null}
      {favorite ? (
        <div className={clsx("absolute top-0 right-0 z-10 text-xl")}>
          <button
            type="button"
            onClick={(event) => handleUpdateFavorite(event)}
          >
            <HeartIcon
              className="h-8"
              stroke="gray"
              fill={
                favorites.some(
                  (favoriteItem: FavoriteItem) => favoriteItem.id === label?.id
                )
                  ? "red"
                  : "white"
              }
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
