import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { cn } from "@/utils/common";

export function Filters() {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selected, setSelected] = useState(params.filter ?? "All");

  const handleCategory = (category: string) => {
    if (selected === category) {
      setSelected("All");
      router.setParams({ filter: "All" });
    } else {
      setSelected(category);
      router.setParams({ filter: category });
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2 mt-3">
      {categories.map(({ title, category }) => {
        return (
          <TouchableOpacity
            key={title}
            className={cn(
              "mr-4 flex items-start justify-center rounded-full px-4 py-2",
              selected === category ? "bg-primary-300" : "border border-primary-200 bg-primary-100",
            )}
            onPress={() => handleCategory(category)}
          >
            <Text
              className={cn(
                selected === category
                  ? "mt-0.5 font-rubik-bold text-white"
                  : "font-rubik text-black-300",
              )}
            >
              {title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
