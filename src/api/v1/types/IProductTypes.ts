export interface IVariant {
  color: string;
  images: string[] | Express.Multer.File[];
  stock: number;
  _id?: string;
}

export interface IProduct {
  name: string;
  slug?: string;
  price: number;
  colors?: string[];
  sizes?: string[];
  categoryId: string;
  subcategoryId: string;
  description?: string;
  material?: string;
  care?: string;
  delivery?: string;
  rating?: number;
  stock?: number;
  images?: string[] | Express.Multer.File[];
  variants?: IVariant[];
}
