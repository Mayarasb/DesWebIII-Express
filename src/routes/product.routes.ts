import { Request, Response, Router } from "express";

// Importação da biblioteca express
import express from "express";
import { IProductsListFilters } from "../../IProducts";
import { listProducts } from "../controllers/product.controller";

const router = express.Router();



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


//define método Listar todos os produtos get que responde no Path /product
router.get("/product", (req: Request, res: Response) => {
res.status(200).json(products)
})

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

    const productFilters = req.query as any;
  const products = listProducts(productFilters);
  res.status(200).json(products);

});

export default router;
