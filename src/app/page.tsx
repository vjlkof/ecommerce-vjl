import { Carousel } from "../components/carousel";
import { ThreeItemGrid } from "../components/grid/three-items";
import { Suspense } from "react";
import Loading from "./loading";
import urlBuilder from "@/lib/utils/urlBuilder";
import getData from "@/lib/utils/apiCall";

export const metadata = {
  description:
    "BONGUSTO es un sitio que une a la comunidad del vino y la hace descubrir con su espectacular tienda",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const result = await getData("product", urlBuilder("product"));
  const homepageItems = result.products;

  return (
    <>
      <ThreeItemGrid products={homepageItems} />
      <Suspense fallback={<Loading />}>
        <Carousel products={homepageItems} />
      </Suspense>
    </>
  );
}
