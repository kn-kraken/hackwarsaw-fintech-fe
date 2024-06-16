"use client";

import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { useRange } from "@/contexts/range.context";

export default function RangeSlider() {
  const [sliderValue, setSliderValue] = useRange();

  return (
    <div className="border-1 absolute bottom-16 z-[10] mx-auto ml-3 grid h-16 w-[calc(100vw-24px)] place-items-center rounded-xl bg-background/70 sm:inset-x-0 sm:left-auto sm:right-0 sm:top-0 sm:m-2 sm:w-[300px]">
      <div className="relative grid h-full w-full place-items-center">
        <span className="absolute left-0 right-0 top-0 mx-auto w-fit text-sm text-primary">
          <span>Range Slider: </span>
          <span className="text-green-900">{`${sliderValue} km`}</span>
        </span>
        <Slider
          defaultValue={[2]}
          max={10}
          min={1}
          step={0.1}
          onValueChange={(value: any) => {
            setSliderValue(value[0]);
          }}
          className={cn("w-[60%]")}
        />
      </div>
    </div>
  );
}
