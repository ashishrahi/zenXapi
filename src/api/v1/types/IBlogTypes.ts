export interface IBlog {
  category: string;
  title: string;
  description: string;
  images: string[];          // URLs of uploaded images
  tags?: string[];           // optional array of strings
  content?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
