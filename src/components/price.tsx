import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "ARS",
  currencyCodeClassName,
}: {
  amount: number;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(String(amount)))}`}
  </p>
);

export default Price;
