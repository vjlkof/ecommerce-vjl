import Prose from "@/components/prose";
import { Product } from "@/lib/utils/types";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="dark:border-neutral-700">
        {product.description.html ? (
          <Prose
            className="!mx-4 lg:!mx-8 text-sm leading-tight dark:text-white/[80%]"
            html={product.description.html}
          />
        ) : null}
      </div>
    </>
  );
}
