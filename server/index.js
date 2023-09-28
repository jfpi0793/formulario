import express from "express"
import cors from "cors"
import router from "./route.js"

const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}))

app.use(express.json())

app.use('/api', router)

app.listen(3002, () =>{
    console.log("Servidor corriendo en el puerto 3002");
})
