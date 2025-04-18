import express, { Request, Response } from "express";
import router from "./product.routes";

// Lista de Clientes const clients = [


let funcionarios = [
    { 
        id: 1, 
        name: "Alice Rosângela Porto",
        document: "519.779.568-90",
        position: "Operadora de Caixa",
        workingHours:"44h" ,
        salary: 1800.00,
        zipCode: "12517-640",
        
    },
    { 
        id: 2, 
        name: "Hugo Raimundo Davi Nunes",
        document: "945.042.868-90",
        position: "Estoquista",
        workingHours:"44h" ,
        salary: 1800.00,
        zipCode: "12954-017",
        
    },
    { 
        id: 3, 
        name: "Liz Adriana Castro",
        document: "497.812.838-23",
        position: "Gerente",
        workingHours:"40h" ,
        salary: 8000.00,
        zipCode: "04657-033",
        
    },
    { 
        id: 4, 
        name: "Bruna Sophie Nina das Neves",
        document: "010.552.788-26",
        position: "Auxiliar Administrativo",
        workingHours:"40h" ,
        salary: 2500.00,
        zipCode: "18605-505",
        
    },
    { 
        id: 5, 
        name: "Luan Matheus Porto",
        document: "497.699.488-02",
        position: "Açougueiro",
        workingHours:"44h" ,
        salary: 2000.00,
        zipCode: "12440-780",
        
    },
    { 
        id: 6, 
        name: "Luiz Miguel Geraldo Barbosa",
        document: "361.253.048-84",
        position: "Repositor",
        workingHours:"44h" ,
        salary: 1700.00,
        zipCode: "02069-030",
        
    },
    { 
        id: 7, 
        name: "Julia Joana Elaine Ferreira",
        document: "253.071.638-27",
        position: "Diretora de Vendas",
        workingHours:"40h" ,
        salary: 6000.00,
        zipCode: "03283-060",
        
    },
    { 
        id: 7, 
        name: "Márcio Samuel Fogaça",
        document: "523.401.518-13",
        position: "Limpeza",
        workingHours:"44h" ,
        salary: 1600.00,
        zipCode: "19803-250",
        
    },
]

//define método que mostra o funcionario por Id get que responde no Path /client/id
router.get("/employee/:id", (req: Request, res: Response) => {
    console.log(req.params.id);

    const employee = funcionarios.find((employee) => {
        return employee.id === Number(req.params.id)
    })
})

// define método para cadastrar um novo funcionario post que responde no Path /employee
router.post("/employee",(req: Request, res: Response) => {
    const employee = req.body;
    funcionarios.push(employee);
    res.status(201).send();
})

// define o metodo para atualizar o funcionario 
router.put("/employee/:id", (req: Request, res: Response) => {
    const employee = funcionarios.find((f) => f.id === Number(req.params.id));
    if (!employee){
        res.status(404).send();
        return 
    } 

    Object.assign(employee, req.body);
    res.status(200).json(employee);
});

// define o metodo para excluir um funcionario

router.delete("/employee/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const employeeExists = funcionarios.some((f) => f.id === id);

    if (employeeExists) {
         res.status(400).json({ message: "Não é permitido excluir um produto existente." });
         return
    }

    res.status(404).json({ message: "Produto não encontrado." });
});




//implemenntando Filtros para funcionarios

router.get("/employee", (req: Request, res: Response) => {
    const { name, document, workingHours } = req.query;

    let filteredEmployees = funcionarios;

    // Função auxiliar para filtrar ignorando case-sensitive e buscando por parte da palavra
    const filterByText = (field: string, value?: string) => {
        if (!value) return true;
        return field.toLowerCase().includes(value.toLowerCase());
    };

    if (name) {
        filteredEmployees = filteredEmployees.filter(f => filterByText(f.name, name as string));
    }

    if (document) {
        filteredEmployees = filteredEmployees.filter(f => filterByText(f.document, document as string));
    }

    if (workingHours) {
        filteredEmployees = filteredEmployees.filter(f => filterByText(f.position, workingHours as string));
    }

   
    res.status(200).json(filteredEmployees);
});

export default router;

