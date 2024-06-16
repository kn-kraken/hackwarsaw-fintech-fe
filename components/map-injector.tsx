"use client";

import { MapContext } from "@/contexts/map.context";
import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapInjector() {
  const map = useMap();
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (mapContext?.setMap) {
      mapContext.setMap(map);
    } else {
      console.error("Map context is not available.");
    }
  }, [map]);

  return null;
}
