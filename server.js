import 'dotenv/config'
import cors from 'cors'
import express, { urlencoded } from 'express'
import router from './src/routes/UserRouter.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use("/api",router)

app.listen(PORT, ()=> {
    console.log(`✅ Servidor rodando na porta: http://localhost:${PORT}`);
})

