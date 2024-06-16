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
import { useRange } from "@/contexts/range.context";

export default function UserCard() {
  const [category, setCategory] = useCategory();
  const [location, setLocation] = useLocation();
  const [real_estates, setRealEstates] = useRealEstates();
  const [businesses, setBusinesses] = useBusinesses();
  const [range, setRange] = useRange();

  const query = useQuery({
    queryKey: [location, category, range],
    queryFn: async () => await getBusinessDir(location!, category!, range),
    enabled: false,
  });

  const onSearch = () => {
    if (!location) {
      alert("Please select location, by clicking on the map");
      return;
    }
    if (!category) {
      alert(
        "Please select category, in which algorithm will calculate the best place for you",
      );
      return;
    }

    query.refetch();
  };

  useEffect(() => {
    if (query.data) {
      setRealEstates(query.data.real_estates);
      setBusinesses(query.data.businesses);
    }
  }, [query]);

  const isQuering = !!query.isLoading || !!query.isFetching || !!query.data;

  return (
    <div className="absolute z-[10] flex h-full w-full flex-col sm:w-0">
      {isQuering ? (
        <div className="absolute left-0 top-0 z-[10] h-16 w-full bg-background sm:w-[392px]"></div>
      ) : (
        <div className="gradient absolute left-16 top-[-4px] h-[68px] rounded-2xl rounded-t-none border-4 border-t-0 bg-background bg-gradient-to-b from-background to-border sm:w-[264px]"></div>
      )}
      {!query.data && (
        <div className="gradient absolute bottom-[-4px] left-16 h-[68px] rounded-2xl rounded-b-none  border-4 bg-background bg-gradient-to-b from-border to-background sm:w-[264px]"></div>
      )}
      <motion.div className="absolute left-0 top-0 z-[10] ml-24 mt-2 h-fit flex-1">
        <CategoryCombobox />
      </motion.div>
      <Results query={query} />
      <Button
        className="absolute bottom-0 z-[10] mb-2 ml-24 w-[200px]"
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}
