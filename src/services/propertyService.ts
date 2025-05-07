import { createClient } from "@supabase/supabase-js";
import { Property } from "../components/properties.type";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!;
if (!supabaseUrl) {
  throw new Error("REACT_APP_SUPABASE_URL is not defined");
}
if (!supabaseKey) {
  throw new Error("REACT_APP_SUPABASE_KEY is not defined");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchPropertiesByCity(
  city: string,
  page: number = 0,
  pageSize: number = 9,
  suburbs: string[] | null = null
): Promise<Property[]> {
  let query = supabase
    .from("properties")
    .select("*")
    .eq("city", city)
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (suburbs && suburbs.length > 0) {
    query = query.in("suburb", suburbs);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Property[];
}
