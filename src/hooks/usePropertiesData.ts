import { useInfiniteQuery } from "react-query";
import { fetchPropertiesByCity } from "../services/propertyService";
import { Property } from "../components/properties.type";

export type PropertiesPage = { properties: Property[] };

export function usePropertiesData(city: string, suburbs?: string[]) {
  const selectedSuburbs = suburbs === undefined ? [] : suburbs;
  const pageSize = 9;
  return useInfiniteQuery<Property[], Error>(
    ["properties", city, selectedSuburbs],
    ({ pageParam = 0 }) =>
      fetchPropertiesByCity(city, pageParam, pageSize, selectedSuburbs),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage && lastPage.length === pageSize
          ? allPages.length + 1
          : undefined,
    }
  );
}
