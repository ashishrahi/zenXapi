import { Types } from "mongoose";

export interface IProduct {
  id: string,
  name: string;                      
  slug: string;                      
  description?: string;              
  price: number;                    
  stock: number;                     
  images: string[];                  
  sizes: string[];                   
  colors: string[];                  
  category: Types.ObjectId;          
  subCategory: Types.ObjectId;       
  isActive: boolean;                 
  createdAt: Date;                    
  updatedAt: Date;  
}
