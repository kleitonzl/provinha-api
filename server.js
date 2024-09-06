import "dotenv/config"
import express from "express"


const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({extended: true})) //Para trabalhar com as imagens
app.use(express.json()) // Para trabalhar com texto

//Importação da Conexão com Banco de Dados
import conn from "./src/config/conn.js"

// Importação dos Módulos (models)
import "./src/models/eventoModel.js"
import "./src/models/feedbackModel.js"
import "./src/models/inscricaoModel.js"
import "./src/models/palestranteModel.js"
import "./src/models/participanteModel.js"

//Importação das Rotas (routes)
import eventoRoutes from "./src/routes/eventoRoute.js"
import feedbackRoutes from "./src/routes/feedbackRoute.js"
import inscricaoRoutes from "./src/routes/inscricaoRoute.js"
import palestranteRoutes from "./src/routes/palestranteRoute.js"
import participanteRoutes from "./src/routes/participanteRoute.js"

// Utilização das rotas
// https://localhost:3000
app.use("/eventos", eventoRoutes)
app.use("/eventos", feedbackRoutes)
app.use("/eventos", inscricaoRoutes)
app.use("/eventos", palestranteRoutes)
app.use("/eventos", participanteRoutes)


app.get("/", (request, response) => {
    response.send("Olá, Mundo!")
})

//404
app.use((request, response) => {
    response.status(404).json({ message: 'Recurso não encontrado' })
})

app.listen(PORT, () => {
    console.log("Servidor on port" + PORT)
})