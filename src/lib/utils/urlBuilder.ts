import { ReadonlyURLSearchParams } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACK_BASE_URL}`
  ? `${process.env.NEXT_PUBLIC_BACK_BASE_URL}`
  : "http://localhost:5000/";

export default function urlBuilder(
  service: string,
  id: string | null = null,
  params: string | null = null
) {
  let url = BASE_URL + service;
  if (id) {
    url += `/${id}`;
  }
  if (params) {
    url = url + "/?" + params;
  }
  return url;
}
