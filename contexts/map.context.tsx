"use client";

import React, { createContext, useState } from "react";
import { Map } from "leaflet";

// Define the context
interface MapContextProps {
  map: Map | null;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

function useMap() {
  const context = React.useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context.map;
}

function MapProvider({ children }: { children: any }) {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider, useMap };
