"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { mapMenu } from "@/lib/constants";
import { MenuItem } from "@/lib/utils/types";

const BreadCrum = () => {
  const pathNames = usePathname()
    .split("/")
    .filter((path) => path !== "");
  const menu = mapMenu;

  return (
    <div className="bg-slate-200 py-5 px-1 md:py-6 md:px-5 lg:px-6">
      <nav aria-label="breadcrumb">
        <ol className="flex truncate">
          {pathNames.map((path, index) => {
            let breadCrumItem = "";
            let pathname = "";
            if (mapMenu.has(path)) {
              const mapItem = mapMenu.get(path) as MenuItem;
              breadCrumItem = mapItem.title;
              pathname = `${mapItem.path}`;
            } else {
              breadCrumItem =
                path[0].toUpperCase() + path.slice(1, path.length);
              pathname = `/${pathNames.slice(0, index + 1).join("/")}`;
            }
            return (
              <li
                key={index}
                className="mx-1 last:font-bold truncate min-w-20 max-w-24 md:min-w-20 md:max-w-60 "
              >
                <Link className="hover:underline" href={pathname}>
                  {breadCrumItem}
                </Link>
                <span>{index < pathNames.length - 1 ? " > " : ""}</span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrum;
