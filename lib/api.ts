import { MOCKS_TEMP } from "./globals";
import {
  BusinessDir,
  BusinessDirDB,
  CoordinatesList,
  Path,
  PathDB,
  Point,
  Res,
} from "./types";

// make fetcher with no-cache
export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  return data;
}

/* export async function getBusinessDir(
  localization: Point,
  category: string,
  range: number,
): Promise<BusinessDir> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/real-estates`);
  url.searchParams.append("business", category);
  url.searchParams.append("latitude", localization.lat.toString());
  url.searchParams.append("longitude", localization.lng.toString());
  url.searchParams.append("range", range.toString());

  const res = (await (await fetch(url.toString())).json()) as BusinessDir;
  console.log(res);

  return { businesses: res.businesses, real_estates: res.real_estates };
}
 */

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getBusinessDir(): Promise<BusinessDirDB> {
  await delay(1000);
  return MOCKS_TEMP as any;
}
