"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "@/components/loading-dots";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { CartItem } from "@/lib/utils/types";

export function AddToCartButton({
  productToAdd,
  availableForSale,
}: {
  productToAdd: CartItem;
  availableForSale: boolean;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    "flex justify-evenly text-center w-40 rounded-2xl bg-blue-600 p-2 py-2 mb-2 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";
  const dispatch = useAppDispatch();

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Fuera de stock
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
        dispatch(
          addToCart({
            id: productToAdd.id,
            name: productToAdd.name,
            url_key: productToAdd.url_key,
            thumbnail: productToAdd.thumbnail,
            amount: productToAdd.amount,
          })
        );
      }}
      aria-label="Agregar al carrito"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90 text-lg": true,
        disabledClasses: pending,
      })}
    >
      <div className="">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <ShoppingCartIcon className="h-8" />
        )}
      </div>
      Agregar
    </button>
  );
}
