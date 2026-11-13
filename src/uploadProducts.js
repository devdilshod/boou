import { supabase } from "./supabase";
import { INITIAL_PRODUCTS } from "./data/products";

export async function uploadProducts() {
  const products = INITIAL_PRODUCTS.map((p) => ({
    product_id: p.id,
    code: p.code,
    name: p.name,
    category: p.category,
    category_name: p.categoryName,
    price: p.price,
    old_price: p.oldPrice || null,
    description: p.description || "",
    image: p.image || "",
    colors: p.colors || [],
    is_popular: p.isPopular || false,
    is_new: p.isNew || false,
    in_stock: p.inStock ?? true,
  }));

  const { data, error } = await supabase
    .from("products")
    .upsert(products, { onConflict: "product_id" })
    .select();

  if (error) {
    console.error("Xatolik:", error);
    alert(error.message);
    return;
  }

  console.log("Yuklangan mahsulotlar:", data);
  alert(`${data.length} ta mahsulot muvaffaqiyatli yuklandi!`);
}