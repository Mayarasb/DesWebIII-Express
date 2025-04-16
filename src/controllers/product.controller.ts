import { IProducts, IProductsListFilters } from "../../IProducts";

let products = [
    {
        id: 1,
        name: "Feijão",
        brand: "Broto Legal",
        barCode:"021930878509328740924",
        supplier: "Rede de Distribuição Ltda",
        stockId: 98,
        price: 8.79,
        weight: 1,
        measureUnit: "Kg",
    },
    {
        id: 2,
        name: "Arroz",
        brand:"Tio João",
        barCode:"2938209302081984053754",
        supplier:"Rede de Distribuição Ltda",
        stockId: 65,
        price: 29.99,
        weight: 5,
        measureUnit: "Kg"
    }
]

export const listProducts = (filters: IProductsListFilters): IProducts[] => {
    const { name, brand, supplier, stockId } = filters;
  
    // Função para comparação com case-insensitive
    const filterByText = (field: string, value?: string) => {
      if (!value) return true;
      return field.toLowerCase().includes(value.toLowerCase());
    };
  
    let filteredProducts = productsMock;
  
    if (name) {
      filteredProducts = filteredProducts.filter(p => filterByText(p.name, name));
    }
  
    if (brand) {
      filteredProducts = filteredProducts.filter(p => filterByText(p.brand, brand));
    }
  
    if (supplier) {
      filteredProducts = filteredProducts.filter(p => filterByText(p.supplier, supplier));
    }
  
    if (stockId) {
      filteredProducts = filteredProducts.filter(p => p.stockId === Number(stockId));
    }
  
    return filteredProducts;

}