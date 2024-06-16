"use client";

import { useMap } from "@/contexts/map.context";
import { ptSerif } from "@/lib/fonts";
import { BusinessDir, RealEstate, Res } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

type Props = {
  query: UseQueryResult<BusinessDir, Error>;
};

const Root = ({
  children,
  className,
}: {
  className?: string;
  children: any;
}) => (
  <div
    className={cn("z-[9] h-full w-full bg-background sm:w-[392px]", className)}
  >
    {children}
  </div>
);

export default function Results({ query }: Props) {
  const { data, isLoading, isError } = query;
  const map = useMap();
  const [random, setRandom] = useState<number>(0);

  useEffect(() => {
    if (data && data.real_estates.length > 0) {
      const randomValue = Math.floor(
        Math.random() * Math.min(data.real_estates.length - 1, 20),
      );
      setRandom(randomValue);
    }
  }, [data]);

  if (!isError && !isLoading && !data) {
    return null;
  }

  if (isError) {
    return (
      <Root className="grid place-items-center text-xl text-red-700">
        Error: try again
      </Root>
    );
  }

  if (isLoading) {
    return (
      <Root className="grid place-items-center">
        <Spinner />
      </Root>
    );
  }

  const { businesses, real_estates } = data as BusinessDir;

  // add idx to real_estates
  let numbered = real_estates.map((real_estate, idx) => ({
    ...real_estate,
    rank: idx + 1,
  }));

  const temp = { ...numbered[random] };
  numbered = numbered.filter((_, idx) => idx !== random);
  numbered.unshift(temp);

  return (
    <Root className="">
      <div className="mb-16 flex h-full max-h-[calc(100vh-128px)] flex-col space-y-4 overflow-y-auto p-4 pb-16 pt-16">
        {numbered.map((real_estate, idx) => (
          <div
            key={real_estate.address}
            className={cn(
              "relative rounded-xl border-2 border-border bg-white p-4 hover:cursor-pointer",
              idx === 0 && "border-yellow-400 shadow-md shadow-yellow-300",
            )}
            onClick={() =>
              map?.flyTo(
                [real_estate.location.lat, real_estate.location.lng - 0.0003],
                18,
              )
            }
          >
            <h2 className="text-lg font-bold">
              {real_estate.address}{" "}
              <span className={`text-green-900 ${ptSerif.className}`}>St.</span>
            </h2>
            <p>
              {real_estate.area}{" "}
              <span className={`text-green-900 ${ptSerif.className}`}>m²</span>
            </p>
            <p>
              {Math.round(real_estate.score * 100)}{" "}
              <span className={`text-green-900 ${ptSerif.className}`}>
                score
              </span>
            </p>
            <p
              className={`absolute right-0 top-0 flex gap-4 p-2 text-green-900 ${ptSerif.className}`}
            >
              {idx === 0 && (
                <span className="flex gap-2 text-yellow-400">
                  <Star /> Sponsored{" "}
                </span>
              )}
              {real_estate.rank}
            </p>
          </div>
        ))}
      </div>
    </Root>
  );
}

const Star = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const Spinner = () => (
  <svg
    aria-hidden="true"
    className="h-16 w-16 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
