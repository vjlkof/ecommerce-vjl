"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "@/components/loading-dots";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/lib/hooks";
import { removeFromCart } from "@/lib/features/cart/cartSlice";
import { CartItem } from "@/lib/utils/types";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { pending } = useFormStatus();
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
        dispatch(
          removeFromCart({
            id: item.id,
            name: item.name,
            url_key: item.url_key,
            thumbnail: { url: item.thumbnail },
            amount: item.amount,
          })
        );
      }}
      aria-label="Remover item del carrito"
      aria-disabled={pending}
      className={clsx(
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
        {
          "cursor-not-allowed px-0": pending,
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}
