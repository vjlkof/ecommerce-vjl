import { GridTileImage } from "@/components/grid/gridTileImage";
import Link from "next/link";
import type { Product } from "@/lib/utils/types";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product-detail/${item.url_key}?id=${item.id}`}
      >
        <GridTileImage
          src={item.thumbnail.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            id: item.id,
            name: item.name,
            discountPercentage: String(
              Math.round(item.price_range.maximum_price.discount.percent_off)
            ),
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({ products }: { products: Product[] }) {
  const homepageItems = products as Product[];

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const firstProduct = homepageItems[0];
  const secondProduct = homepageItems[1];
  const thirdProduct = homepageItems[2];

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
