import { IProduct, IVariant } from "../api/v1/types/IProductTypes";

interface ProcessProductOptions {
  payload: IProduct & { variantImages?: Express.Multer.File[] | string[] };
  files?: { [key: string]: Express.Multer.File[] };
}

export const processProductPayload = ({ payload, files }: ProcessProductOptions): IProduct => {
  // Process main product images
  const mainImages: string[] = Array.isArray(payload.images)
    ? payload.images.map(file => (typeof file === "string" ? file : file.path))
    : [];
    

  // Ensure variants is always an array
  const variants: IVariant[] = Array.isArray(payload.variants) ? payload.variants : [];

  // Process variant images
  const variantsWithImages = variants.map((variant, i) => {
    const imagesFromPayload = Array.isArray(variant.images)
      ? variant.images.map(img => (typeof img === "string" ? img : img.path))
      : [];

    const fieldName = `variants[${i}][images]`;
    const imagesFromFiles = (files?.[fieldName] || []).map(f => f.path);

    return {
      ...variant,
      images: [...imagesFromPayload, ...imagesFromFiles],
    };
  });

  // Return processed product data
  return {
    name: payload.name,
    slug: payload.slug || (payload.name ? payload.name.toLowerCase().replace(/\s+/g, "-") : ""),
    price: payload.price,
    categoryId: payload.categoryId,
    subcategoryId: payload.subcategoryId || "",
    description: payload.description || "",
    material: payload.material || "",
    care: payload.care || "",
    delivery: payload.delivery || "",
    rating: payload.rating || 0,
    stock: payload.stock || 0,
    images: mainImages,
    variants: variantsWithImages,
    colors: Array.isArray(payload.colors) ? payload.colors.map(c => c.toString().trim()) : [],
    sizes: Array.isArray(payload.sizes) ? payload.sizes.map(s => s.toString().trim()) : [],
  };
};
