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

    export async function fetchPropertiesByCity(city: string): Promise<Property[]> {
        const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("city", city);

    if (error) throw new Error(error.message);
    return data as Property[];
    }
