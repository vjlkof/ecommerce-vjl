"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "@/components/loading-dots";
import type { FavoriteItem } from "@/lib/utils/types";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/lib/hooks";
import { removeFavorite } from "@/lib/features/favorite/favoriteSlice";

export function DeleteFavoriteButton({ item }: { item: FavoriteItem }) {
  const { pending } = useFormStatus();
  const dispatch = useAppDispatch();

  function handleRemoveFavorite(event: React.FormEvent<HTMLButtonElement>) {
    if (pending) event.preventDefault();
    event.preventDefault();
    dispatch(removeFavorite(item.id));
  }

  return (
    <form>
      <button
        type="submit"
        onClick={(event) => handleRemoveFavorite(event)}
        aria-label="Remover de favoritos"
        aria-disabled={pending}
        className={clsx(
          "ease flex h-[20px] w-[20px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
          {
            "cursor-not-allowed px-0": pending,
          }
        )}
      >
        {pending ? (
          <LoadingDots className="bg-white" />
        ) : (
          <TrashIcon className="hover:text-accent-3 mx-[1px] h-8 w-8 text-white dark:text-black" />
        )}
      </button>
    </form>
  );
}
