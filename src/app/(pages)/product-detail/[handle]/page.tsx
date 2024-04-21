import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Gallery } from "@/components/product/gallery";
import ProductDescription from "@/components/product/product-description";
import { Product } from "@/lib/utils/types";
import { MediaGallery } from "@/lib/utils/types";
import ProductDetail from "@/components/product/product-detail";
import getData from "@/lib/utils/apiCall";
import urlBuilder from "@/lib/utils/urlBuilder";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { id: productId } = searchParams ?? {};
  const product = (await getData(
    "product",
    urlBuilder("product", productId as string)
  )) as Product;

  if (!product) return notFound();

  const { url } = product.thumbnail || {};

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.description.html,
    openGraph: url
      ? {
          images: [
            {
              url,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { id: productId } = searchParams ?? {};
  const product = (await getData(
    "product",
    urlBuilder("product", productId as string)
  )) as Product;

  if (!product) return notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-screen-2xl lg:px-4">
        <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row p-4 lg:p-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.media_gallery.map(
                  (mediaGalleryItem: MediaGallery) => ({
                    product: {
                      id: product.id,
                      name: product.name,
                      url_key: product.url_key,
                      thumbnail: product.thumbnail,
                    },
                    src: mediaGalleryItem.url,
                    altText: !mediaGalleryItem.label
                      ? ""
                      : mediaGalleryItem.label,
                  })
                )}
              />
            </Suspense>
          </div>
          <div className="w-full">
            <ProductDetail product={product} />
          </div>
        </div>
        <div className="w-full">
          <ProductDescription product={product} />
        </div>
      </div>
    </div>
  );
}
