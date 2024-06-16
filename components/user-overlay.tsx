"use client";

import { motion } from "framer-motion";
import { CategoryCombobox } from "./category-combobox";
import { Button } from "./ui/button";
import { useCategory, useLocation } from "@/contexts/query.context";
import { useQuery } from "@tanstack/react-query";
import { getBusinessDir } from "@/lib/api";
import Results from "./results";
import { useEffect } from "react";
import { useBusinesses, useRealEstates } from "@/contexts/results.context";

export default function UserOverlay() {
  const [location, setLocation] = useLocation();
  const [real_estates, setRealEstates] = useRealEstates();
  const [businesses, setBusinesses] = useBusinesses();
  const [category, setCategory] = useCategory();

  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => await getBusinessDir(location!, category!, range),
    enabled: false,
  });

  const onSearch = () => {
    query.refetch();
  };

  useEffect(() => {
    if (query.data) {
      setRealEstates(query.data.real_estates);
      setBusinesses(query.data.businesses);
    }
  }, [query]);

  return (
    <>
      <Button
        className="absolute bottom-4 left-16 z-[10] w-fit px-8"
        onClick={onSearch}
      >
        Search
      </Button>
    </>
  );
}
