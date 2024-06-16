"use client";

import { Point } from "@/lib/types";
import { LatLng } from "leaflet";
import React, { createContext, useState } from "react";

interface QueryContextProps {
  location: Point | null;
  category: string | null;
  setLocation: React.Dispatch<React.SetStateAction<Point | null>>;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);

function useLocation() {
  const context = React.useContext(QueryContext);
  if (!context) {
    throw new Error("useLocation must be used within a QueryProvider");
  }
  return [context.location, context.setLocation] as const;
}

function useCategory() {
  const context = React.useContext(QueryContext);
  if (!context) {
    throw new Error("useCategory must be used within a QueryProvider");
  }
  return [context.category, context.setCategory] as const;
}

function QueryProvider({ children }: { children: any }) {
  const [location, setLocation] = useState<Point | null>(null);
  const [category, setCategory] = useState<string | null>("");

  return (
    <QueryContext.Provider
      value={{ location, setLocation, category, setCategory }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export { QueryContext, QueryProvider, useLocation, useCategory };
