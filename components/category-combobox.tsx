"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategory } from "@/contexts/query.context";

const CATEGORIES = [
  { label: "Alcohol", value: "ALCOHOL" },
  { label: "Bakery", value: "BAKERY" },
  { label: "Bar", value: "BAR" },
  { label: "Butcher", value: "BUTCHER" },
  { label: "Cafe", value: "CAFE" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Greengrocer", value: "GREENGROCER" },
  { label: "Hairdresser", value: "HAIRDRESSER" },
  { label: "Locksmith", value: "LOCKSMITH" },
  { label: "Pet grooming", value: "PET_GROOMING" },
  { label: "Restaurant", value: "RESTAURANT" },
  { label: "Shoe repair", value: "SHOE_REPAIR" },
  { label: "Tailor", value: "TAILOR" },
];

export function CategoryCombobox({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  let [value, setValue] = useCategory();

  value = value === null ? "" : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? CATEGORIES.find((framework) => framework.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="w-full">
          <CommandInput className="!w-full" placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {CATEGORIES.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
