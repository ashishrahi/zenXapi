export interface ICategory  {
  name: string;
  slug: string;
  gender: "mens" | "womens" | "kids";
  images: Record<string, string[]>; // { color: [urls] }
  description: string;
}