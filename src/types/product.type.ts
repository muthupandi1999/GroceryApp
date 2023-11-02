import { Unit } from "./enums";

export type productDetails = {
  key: string;
  value: string;
};

export type productDetailsInput = {
  key: string;
  value: string;
};


export type variantsInput = {
  unit: Unit;
  size?:string;
  values:string;
  price: number;
  stock:number
};




export type units = {
  id: string;
  unit: string;
  price: number;
  stock:number
};

export type Products = {
  id: string;
  name: string;
  description: [productDetails];
  units: [units];
  image: string;
  rating: number;
  ratingCount: number;
  isActive: Boolean;
};

export type ProductimageAssets = {
  front: string;
  back: string;
  left: string;
  right: string;
};

export type CreateProductInput = {
  name: string;
  image: ProductimageAssets;
  shortDescription: string;
  tagId?:string
  description: [productDetailsInput];
  variant: [variantsInput];
  branchId:string
};



export type productStatus = {
  message: string;
  data: Products;
};
export type UpdateProductInput = {
  name?: string;
  image?: ProductimageAssets;
  description?: [productDetailsInput];
  units?: [variantsInput];
  tagId?:string
  isActive?: boolean;
};

export type ImageData = {
  front: string;
  back: string;
  left: string;
  right: string;
};

export type ProductImageAssets = {
  id: string;
} & ImageData;


