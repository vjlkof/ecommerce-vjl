import Prose from "@/components/prose";
import { Product } from "@/lib/utils/types";
import { AddToCartButton } from "@/components/cart/add-to-cart";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-flow dark:border-neutral-700">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-bold flex-grow min-h-9">
            {product.name}
          </h3>
          <div className="flex items-center">
            <p className="text-3xl line-through">
              $ {product.price_range.maximum_price.regular_price.value}
            </p>
            <span className="text-4xl ml-2 no-line-through text-[rgb(118,32,87)] font-bold">
              {`(${String(
                Math.round(
                  product.price_range.maximum_price.discount.percent_off
                )
              )}%)`}
            </span>
          </div>
          <h2 className="text-4xl font-bold">
            $ {product.price_range.maximum_price.final_price.value}
          </h2>
          {product.contenido ? (
            <Prose
              className="!mx-0 text-sm leading-none dark:text-white/[60%]"
              html={product.contenido}
            />
          ) : null}
          <AddToCartButton
            productToAdd={{
              id: product.id,
              name: product.name,
              url_key: product.url_key,
              thumbnail: product.thumbnail,
              amount: product.price_range.maximum_price.final_price,
            }}
            availableForSale={product.stock > 0 ? true : false}
          />
        </div>
      </div>
    </>
  );
}
