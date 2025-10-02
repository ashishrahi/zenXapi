// Updated RawProduct type
export interface RawProduct {
  _id: string;
  name: string;
  price: number;
  colors: string[];
  variants: {
    color: string;
    images: string[];
    stock: number;
    _id: string;
  }[];
  sizes: string[];
  categoryId: { _id: string; slug: string } | null;    // categoryId with _id and slug
  subcategoryId: { _id: string; slug: string } | null; // subcategoryId with _id and slug
  description: string;
  material: string;
  care: string;
  delivery: string;
  rating: number;
  slug: string;
}

// Updated TransformedProduct with categoryId and subcategoryId
interface TransformedProduct {
  _id: string;
  name: string;
  price: number;
  colors: string[];
  images: Record<string, string[]>;
  sizes: string[];
  categoryId: string;      // category ki actual ID
  subcategoryId: string;   // subcategory ki actual ID
  category: string;        // category slug (backward compatibility)
  subcategory: string;     // subcategory slug (backward compatibility)
  description: string;
  material: string;
  care: string;
  delivery: string;
  rating: number;
  slug: string;
}

// Transform function
export const transformProducts = (data: RawProduct[]): TransformedProduct[] => {
  return data.map((product) => {
    // Extract colors
    const colors = product.colors.flatMap((c) =>
      c.split(",").map((color) => color.replace(/"/g, "").trim())
    );

    // Extract sizes
    const sizes = product.sizes.flatMap((s) =>
      s.split(",").map((size) => size.replace(/"/g, "").trim())
    );

    // Build images object by color
    const images = product.variants.reduce<Record<string, string[]>>(
      (acc, variant) => {
        const colorKey = variant.color.trim();
        if (!acc[colorKey]) acc[colorKey] = [];
        acc[colorKey] = [...acc[colorKey], ...variant.images];
        return acc;
      },
      {}
    );

    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      colors,
      images,
      sizes,
      categoryId: product.categoryId?._id || "",         // category ki actual ID
      subcategoryId: product.subcategoryId?._id || "",   // subcategory ki actual ID
      category: product.categoryId?.slug || "",          // slug for backward compatibility
      subcategory: product.subcategoryId?.slug || "",    // slug for backward compatibility
      description: product.description,
      material: product.material,
      care: product.care,
      delivery: product.delivery,
      rating: product.rating,
    };
  });
};