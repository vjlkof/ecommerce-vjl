import Grid from "@/components/grid/grid";
import { GridTileImage } from "@/components/grid/gridTileImage";
import { Product } from "@/lib/utils/types";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product: Product) => (
        <Grid.Item
          key={product.id}
          className="flex flex-col gap-3 items-center animate-fadeIn p-3 rounded-lg border bg-white hover:border-blue-600 dark:bg-black"
        >
          <Link
            className="flex flex-col gap-2 h-full w-full text-center"
            href={`/product-detail/${product.url_key}?id=${product.id}`}
          >
            <GridTileImage
              alt={product.name}
              label={{
                id: product.id,
                name: product.name,
                url_key: product.url_key,
                thumbnail: product.thumbnail.url,
                discountPercentage: String(
                  Math.round(
                    product.price_range.maximum_price.discount.percent_off
                  )
                ),
              }}
              src={product.thumbnail.url}
              width={350}
              height={350}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              favorite={true}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold mr-4 line-clamp-2 flex-grow min-h-9 pl-5 leading-none tracking-tight overflow-hidden">
                {product.name}
              </h3>
              <s>
                <p className="text-lg">
                  $ {product.price_range.maximum_price.regular_price.value}
                </p>
              </s>
              <h2 className="text-3xl font-bold">
                $ {product.price_range.maximum_price.final_price.value}
              </h2>
            </div>
          </Link>
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
        </Grid.Item>
      ))}
    </>
  );
}
