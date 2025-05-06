import { useInfiniteQuery } from "react-query";
import { fetchPropertiesByCity } from "../services/propertyService";
import { Property } from "../components/properties.type";

export type PropertiesPage = {properties: Property[]};

export function usePropertiesData(city: string, suburbs?: string[]) {
  const pageSize = 9;
  return useInfiniteQuery<Property[], Error>(
    ["properties", city, suburbs],
    ({ pageParam = 1 }) => fetchPropertiesByCity(city, pageParam, pageSize, suburbs),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage && lastPage.length === pageSize ? allPages.length + 1 : undefined,
    }
  );

}

