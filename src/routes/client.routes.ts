import express, { Request, Response } from "express";

const router = express.Router();

let clientes = [
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

// define o metodo para listar todos os clientes
router.get("/client", (req: Request, res: Response) => {
    res.status(200).json(clientes)
})

//define método que mostra o cliente por Id get que responde no Path /client/id
router.get("/client/:id", (req: Request, res: Response) => {
    console.log(req.params.id);

    const client = clientes.find((clientes) => {
        return clientes.id === Number(req.params.id)
    })
})  

// define método para cadastrar um novo cliente post que responde no Path /client
router.post("/client",(req: Request, res: Response) => {
    const client = req.body;
    clientes.push(client);
    res.status(201).send();
})

// define o metodo para atualizar o cliente 
router.put("/client/:id", (req: Request, res: Response) => {
    const client = clientes.find((c) => c.id === Number(req.params.id));
    if (!client) {
         res.status(404).send();
         return
    }
    Object.assign(client, req.body);
    res.status(200).json(client);
});

// define o metodo para excluir um clientes 

router.delete("/client/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const clientExists = clientes.some((c) => c.id === id);

    if (clientExists) {
        res.status(400).json({ message: "Não é permitido excluir um produto existente." });
        return 
    }

    res.status(404).json({ message: "Produto não encontrado." });
});


// define o metodo para listar todos os clientes
router.get("/employee", (req: Request, res: Response) => {
    res.status(200).json(clientes)
})

//implementando Filtros para clientes

router.get("/client", (req: Request, res: Response) => {
    const { name, document, email } = req.query;

    let filteredClients = clientes;

    // Função auxiliar para filtrar ignorando case-sensitive e buscando por parte da palavra
    const filterByText = (field: string, value?: string) => {
        if (!value) return true;
        return field.toLowerCase().includes(value.toLowerCase());
    };

    if (name) {
        filteredClients = filteredClients.filter(c => filterByText(c.name, name as string));
    }

    if (document) {
        filteredClients = filteredClients.filter(c => filterByText(c.document, document as string));
    }

    if (email) {
        filteredClients = filteredClients.filter(c => filterByText(c.email, email as string));
    }

        res.status(200).json(filteredClients);
});

export default router;

