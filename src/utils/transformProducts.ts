interface RawProduct {
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
  category: string;
  subCategory: string;
  description: string;
  material: string;
  care: string;
  delivery: string;
  rating: number;
  slug: string
}

interface TransformedProduct {
  id: string;
  name: string;
  price: number;
  colors: string[];
  images: Record<string, string[]>;
  sizes: string[];
  category: string;
  description: string;
  material: string;
  care: string;
  delivery: string;
  rating: number;
}

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
    const images = product.variants.reduce<Record<string, string[]>>((acc, variant) => {
      const colorKey = variant.color.trim();
      if (!acc[colorKey]) {
        acc[colorKey] = [];
      }
      acc[colorKey] = [...acc[colorKey], ...variant.images];
      return acc;
    }, {});

    return {
      id: product._id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      colors,
      images,
      sizes,
      category: product.category.slug,
      subcategory: product.category.slug,
      description: product.description,
      material: product.material,
      care: product.care,
      delivery: product.delivery,
      rating: product.rating,
    };
  });
};
