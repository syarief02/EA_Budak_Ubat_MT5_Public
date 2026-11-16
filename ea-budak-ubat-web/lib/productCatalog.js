import { supabase } from "@/lib/supabase";
import { FALLBACK_PRODUCTS } from "@/lib/productsFallback";

// The product catalog for server-rendered pages (product pages, sitemap): the live `mql_products` table,
// or the fallback list when the database is unreachable or empty.
export async function getCatalog() {
  try {
    const { data, error } = await supabase
      .from("mql_products")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) return data;
  } catch {
    // fall through to the fallback list
  }
  return FALLBACK_PRODUCTS;
}
