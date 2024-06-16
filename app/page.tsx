import Image from "next/image";
import UserCard from "@/components/user-card";
import { CoordinatesList } from "@/lib/types";
import RangeSlider from "@/components/range-slider";
import Rand from "rand-seed";
import dynamic from "next/dynamic";
import { MOCKS_REGIONS } from "@/lib/globals";
const MapFC = dynamic(() => import("../components/map/map-fc"), {
  ssr: false,
});

const SEED = "123123";

const interpolateColor = (value: number) => {
  const red = Math.round(255 * (1 - value));
  const green = Math.round(255 * value);
  return `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}00`;
};

export default async function Home() {
  const regions = (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/polygons`)
  ).json()) as CoordinatesList[];

  // add to regions color which is generated random from the seed and 0 should be red and 1 should be green as hex
  const rand = new Rand(SEED);

  const newRegions = regions.map((region, idx) => {
    const random = rand.next();

    return {
      ...region,
      color: interpolateColor(random),
    };
  });

  return (
    <main className="relative flex-1 grid-cols-4">
      <MapFC regions={MOCKS_REGIONS as any} />
      <UserCard />
      <RangeSlider />
    </main>
  );
}
