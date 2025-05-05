import { useEffect, useState } from "react";
import { fetchPropertiesByCity } from "../services/propertyService";
import { Property } from "../components/properties.type";

export function usePropertiesData(city: string) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchPropertiesByCity(city);
        setProperties(data);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    }
    load();
  }, [city]);

  return { properties, loading, error };
}
