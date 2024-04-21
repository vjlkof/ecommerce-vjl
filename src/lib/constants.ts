export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "NAME" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Nombre Ascendente",
  slug: "name-asc",
  sortKey: "NAME",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Nombre Descendente",
    slug: "name-desc",
    sortKey: "NAME",
    reverse: true,
  },
  {
    title: "Precio: bajo a alto",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  },
  {
    title: "Precio: alto a bajo",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const mapMenu = new Map([
  ["home", { title: "Home", path: "/", show: true }],
  ["about", { title: "Nosotros", path: "/about", show: true }],
  ["product-list", { title: "Tienda", path: "/product-list", show: true }],
  ["contact", { title: "Contacto", path: "/contact", show: true }],
  ["product-detail", { title: "Tienda", path: "/product-list", show: false }],
]);

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
