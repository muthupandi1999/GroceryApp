export type CreateCategoryInput = {
  name: string;
  image: string;
};

export type UpdateCategoryInput = {
  name?: string;
  image?: string;
};

export interface ProductInfo {
  id:string;
  name:string;
  products:any[]
}
