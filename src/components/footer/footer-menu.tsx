"use client";

import clsx from "clsx";
import { MenuItem } from "@/lib/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FooterMenuItem = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    item.show && (
      <li>
        <Link
          href={item.path}
          className={clsx(
            "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300",
            {
              "text-black dark:text-neutral-300": active,
            }
          )}
        >
          {item.title}
        </Link>
      </li>
    )
  );
};

export default function FooterMenu({ menu }: { menu: MenuItem[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: MenuItem) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
