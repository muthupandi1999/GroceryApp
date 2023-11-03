import { Unit } from "./enums";
export type createSupplierProduct = {
    name:string
    productCode:string;
    totalStock:number;
    minimumAvailableStock:number
    unit:Unit
}