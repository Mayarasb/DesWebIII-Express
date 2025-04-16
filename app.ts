

// Importação da biblioteca express
import express from "express";

import productRoutes from "./src/routes/product.routes";
import clientRoutes from "./src/routes/client.routes";



//Criação da aplicação 
const app = express();

//Configura a aplicação para receber json no body das requisições
app.use(express.json()); 

app.use("/product", productRoutes)
app.use("/client", clientRoutes);

app.use("/", productRoutes);


//iniciar o servidor: listen
//listen : 2 parametros (porta, callback)
//callback: chamada de volta, função quando o sevidor iniciar, irá executar


//iniciando aplicação na porta 3000
app.listen(3000, () => {
    console.log("Servidor executando na porta 3000")
})

