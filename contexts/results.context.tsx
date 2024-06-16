"use client";

import { Businesses, Point, RealEstate } from "@/lib/types";
import { LatLng } from "leaflet";
import React, { createContext, useState } from "react";

interface ResultsContextProps {
  real_estates: RealEstate[] | null;
  setRealEstates: React.Dispatch<React.SetStateAction<RealEstate[] | null>>;
  businesses: Businesses[] | null;
  setBusinesses: React.Dispatch<React.SetStateAction<Businesses[] | null>>;
}

const ResultsContext = createContext<ResultsContextProps | undefined>(
  undefined,
);

function useRealEstates() {
  const context = React.useContext(ResultsContext);
  if (!context) {
    throw new Error("useLocation must be used within a ResultsProvider");
  }
  return [context.real_estates, context.setRealEstates] as const;
}

function useBusinesses() {
  const context = React.useContext(ResultsContext);
  if (!context) {
    throw new Error("useCategory must be used within a ResultsProvider");
  }
  return [context.businesses, context.setBusinesses] as const;
}

function ResultsProvider({ children }: { children: any }) {
  const [real_estates, setRealEstates] = useState<RealEstate[] | null>(null);
  const [businesses, setBusinesses] = useState<Businesses[] | null>(null);

  return (
    <ResultsContext.Provider
      value={{ real_estates, setRealEstates, businesses, setBusinesses }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export { ResultsContext, ResultsProvider, useRealEstates, useBusinesses };
