"use client";

import React, { createContext, useState } from "react";

interface RangeContextProps {
  range: number;
  setRange: React.Dispatch<React.SetStateAction<number>>;
}

const RangeContext = createContext<RangeContextProps | undefined>(undefined);

function useRange() {
  const context = React.useContext(RangeContext);
  if (!context) {
    throw new Error("useRange must be used within a RangeProvider");
  }
  return [context.range, context.setRange] as const;
}

function RangeProvider({ children }: { children: any }) {
  const [range, setRange] = useState<number>(2);

  return (
    <RangeContext.Provider value={{ range, setRange }}>
      {children}
    </RangeContext.Provider>
  );
}

export { RangeContext, RangeProvider, useRange };
