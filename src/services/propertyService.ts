import { createClient } from "@supabase/supabase-js";
import { Property } from "../components/properties.type";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchPropertiesByCity(city: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("city", city);

  if (error) throw new Error(error.message);
  return data as Property[];
}
