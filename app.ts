import { Cipher } from "crypto";
import { Request, Response } from "express";

//Importação da biblioteca Express
const express = require('express');

//Criação da aplicação 
const app = express()

//Configura a aplicação para receber json no body das requisições
app.use(express.json()); 

//implementar o método get (path), aron function
//req = todos os parametros da requisição
//res = responder a resquisição
//send = envia uma resposta para quem chamou API

//define método get que responde no Path /, responde a requisição com Hello Word

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

// Lista de Clientes const clients = [
let Clientes = [
    { 
        id: 1, 
        name: "Marcos  Melo",
        document: "093.409.060-20",
        zipCode: "18052-721",
        phone: "(15) 99990-4290",
        email: "MarcosMelo@email.com"
    },

    { 
        id: 2, 
        name: "Nicolas  Farias",
        document: "626.983.088-50",
        zipCode: "18053-510",
        phone: "(15) 99506-3536",
        email: "Nicolas_Faria@email.com"
    },

    { 
        id: 3, 
        name: "Yasmin Sales",
        document: "511.466.968-09",
        zipCode: "18053-900",
        phone: "(15) 98392-7464",
        email: "YasminSales@email.com"
    },
  
];


//define método que mostra produto por Id get que responde no Path /product/id
app.get("/product/:id", (req: Request, res: Response) => {
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
app.get("/product", (req: Request, res: Response) => {
    res.status(200).json(products)
})

// define método para cadastrar um novo produto post que responde no Path /product
app.post("/product",(req: Request, res: Response) => {
    const product = req.body;
    products.push(product);
    res.status(201).send();
})

// define o metodo para atualizar o produto 
app.put("/product/:id", (req: Request, res: Response) => {
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) return res.status(404).send();

    Object.assign(product, req.body);
    res.status(200).json(product);
});

// define o metodo para excluir um produto 

app.delete("/product/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const initialLength = products.length;

    products = products.filter((p) => p.id !== id);

    if (products.length === initialLength) return res.status(404).send();

    res.status(204).send();
});

// define o metodo para listar todos os clientes
app.get("/client", (req: Request, res: Response) => {
    res.status(200).json(Clientes)
})

//define método que mostra o cliente por Id get que responde no Path /client/id
app.get("/client/:id", (req: Request, res: Response) => {
    console.log(req.params.id);

    const product = products.find((product) => {
        return product.id === Number(req.params.id)
    })
})

// define método para cadastrar um novo cliente post que responde no Path /client
app.post("/client",(req: Request, res: Response) => {
    const client = req.body;
    Clientes.push(client);
    res.status(201).send();
})

// define o metodo para atualizar o cliente 
    app.put("/client/:id", (req: Request, res: Response) => {
    const client = Clientes.find((c) => c.id === Number(req.params.id));
    if (!client) return res.status(404).send();

    Object.assign(client, req.body);
    res.status(200).json(client);
});

// define o metodo para excluir um produto 

app.delete("/client/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const initialLength = Clientes.length;

    Clientes = Clientes.filter((c) => c.id !== id);

    if (Clientes.length === initialLength) return res.status(404).send();

    res.status(204).send();
});


//


//iniciar o servidor: listen
//listen : 2 parametros (porta, callback)
//callback: chamada de volta, função quando o sevidor iniciar, irá executar


//iniciando aplicação na porta 3000
app.listen(3000, () => {
    console.log("Servidor executando na porta 3000")
})

