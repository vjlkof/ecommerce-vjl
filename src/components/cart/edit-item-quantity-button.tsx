"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "@/components/loading-dots";
import type { CartItem } from "@/lib/utils/types";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart, decreaseCart } from "@/lib/features/cart/cartSlice";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const { pending } = useFormStatus();
  const dispatch = useAppDispatch();

  function handleClickOnButton(event: React.FormEvent<HTMLButtonElement>) {
    if (pending) event.preventDefault();
    event.preventDefault();
    if (type === "plus") {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          url_key: item.url_key,
          thumbnail: { url: item.thumbnail },
          amount: item.amount,
        })
      );
    } else {
      dispatch(
        decreaseCart({
          id: item.id,
          name: item.name,
          url_key: item.url_key,
          thumbnail: { url: item.thumbnail },
          amount: item.amount,
        })
      );
    }
  }
  return (
    <button
      type="button"
      onClick={(event) => handleClickOnButton(event)}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "cursor-not-allowed": pending,
          "ml-auto": type === "minus",
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
