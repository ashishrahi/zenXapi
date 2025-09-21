
export interface ICategory {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
   images?: string[] | { files: Express.Multer.File[] }[];
  
}
