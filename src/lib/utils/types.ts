export type Cart = {
  carts: CartItem[];
  totalAmount: Money;
  totalQuantity: number;
};

export type CartItem = {
  id: number;
  name: string;
  url_key: string;
  thumbnail: { url: string };
  amount: Money;
  quantity?: number;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type MenuItem = {
  title: string;
  path: string;
};

export type MapMenu = Map<string, MenuItem>;

export type Money = {
  currency: string;
  value: number;
};

export type Category = {
  name: string;
};

export type MediaGallery = {
  label: string | null;
  url: string;
};

export type CategoriesFilterItem = { title: string; path: string };

export type FavoriteItem = {
  id: number;
  name: string;
  url_key: string;
  thumbnail: { url: string };
};

export type ProductForPaginator = {
  resultQtty: number;
  limit: string;
  current: number;
  next: number;
  previous: null;
  products: Product[];
};

export type Product = {
  id: number;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  url_key: string;
  name: string;
  categories: Category[];
  envio_gratis: number;
  contenido: string;
  stock: number;
  descuento_socios: string;
  thumbnail: { url: string };
  description: { html: string };
  sku: string;
  media_gallery: MediaGallery[];
  price_range: {
    maximum_price: {
      final_price: Money;
      discount: { amount_off: number; percent_off: number };
      regular_price: Money;
    };
  };
};

export type SEO = {
  title: string;
  description: string;
};
