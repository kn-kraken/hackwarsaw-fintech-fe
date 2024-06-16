"use client";

import { useMap } from "@/contexts/map.context";
import { useLocation } from "@/contexts/query.context";
import { warsawCenter } from "@/lib/globals";
import L from "leaflet";
import { Button } from "./ui/button";

export default function FocusBtn() {
  const map = useMap();
  const [location, setLocation] = useLocation();

  const handleClick = () => {
    if (location) {
      map?.flyTo([location.lat, location.lng - 0.0003], 18);
    }
  };

  return (
    <Button onClick={handleClick} variant="outline" className="flex gap-2">
      Focus on
      <User />
    </Button>
  );
}

function User() {
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
      className="lucide lucide-user"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
