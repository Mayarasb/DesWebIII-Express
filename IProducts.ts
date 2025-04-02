export interface IProducts {
    id: number;
    name : string;
    brand: string;
    barCode: string;
    supplier: string;
    stockId: number;
    price: number;
    weight: number;
    measureUnit: string;

}

export interface IProductsListFilters {
  
    name? : string;
    brand?: string;
    supplier?: string;
    stockId?: number;


}