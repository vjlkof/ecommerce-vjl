import clsx from "clsx";

const Label = ({ amount }: { amount: string }) => {
  return (
    <>
      <div className={clsx("absolute bottom-0 right-0")}>
        <div className="flex items-center rounded-full border bg-white/70 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <p className="flex-none bg-[rgb(118,32,87)]/80 p-2 text-white">
            {amount} %
          </p>
        </div>
      </div>
    </>
  );
};

export default Label;
