import { Request, Response, Router } from "express";

// Importação da biblioteca express
import express from "express";
import { IProductsListFilters } from "../../IProducts";

const router = express.Router();

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

//define método que mostra produto por Id get que responde no Path /product/id
router.get(":id", (req: Request, res: Response) => {
    console.log(req.params.id);

    const product = products.find((product) => {
        return product.id === Number(req.params.id)
    })

if(!product){
    res.status(404).send();
    return;
}

//Responde a requisição com o produto encontrado
    res.status(200).json(product);
});


// //define método Listar todos os produtos get que responde no Path /product
// //app.get("/product", (req: Request, res: Response) => {
//     res.status(200).json(products)
// })

// define método para cadastrar um novo produto post que responde no Path /product
router.post("/",(req: Request, res: Response) => {
    const product = req.body;
    products.push(product);
    res.status(201).send();
})

// define o metodo para atualizar o produto 
router.put(":id", (req: Request, res: Response) => {
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product){
        res.status(404).send();
        return 

    } 


    Object.assign(product, req.body);
    res.status(200).json(product);
});

// define o metodo para excluir um produto 

router.delete(":id", (req:Request,res:Response) => {
    const id = Number(req.params.id);
    const productExists = products.some((p) => p.id === id);

    if (productExists) {
        res.status(400).json({ message: "Não é permitido excluir um produto existente." });
        return;
    }

    res.status(404).json({ message: "Produto não encontrado." });
});

//implementando Filtros para produtos (aula)



router.get("/", (req: Request, res: Response) => {
    const { name, brand, supplier, stockId } = req.query;

    let filteredProducts = products;

    // Função auxiliar para filtrar ignorando case-sensitive e buscando por parte da palavra
    const filterByText = (field: string, value?: string) => {
        if (!value) return true;
        return field.toLowerCase().includes(value.toLowerCase());
    };

    if (name) {
        filteredProducts = filteredProducts.filter(p => filterByText(p.name, name as string));
    }

    if (brand) {
        filteredProducts = filteredProducts.filter(p => filterByText(p.brand, brand as string));
    }

    if (supplier) {
        filteredProducts = filteredProducts.filter(p => filterByText(p.supplier, supplier as string));
    }

    if (stockId) {
        filteredProducts = filteredProducts.filter(p => p.stockId === Number(stockId));
    }

    res.status(200).json(filteredProducts);
});

export default router;
