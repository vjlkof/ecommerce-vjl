import Link from "next/link";
import { GridTileImage } from "./grid/gridTileImage";
import { Product } from "@/lib/utils/types";

export async function Carousel({ products }: { products: Product[] }) {
  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product-detail/${product.url_key}?id=${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  id: product.id,
                  name: product.name,
                  url_key: product.url_key,
                  thumbnail: product.thumbnail.url,
                  discountPercentage: String(
                    product.price_range.maximum_price.discount.percent_off
                  ),
                }}
                src={product.thumbnail?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
