import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { autenticar } from './middlewares/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'https://saas-estetica-rho.vercel.app',
  credentials: true
}))
app.use(express.json())

// Rota pública
import('./routes/auth').then(m => app.use('/auth', m.default))

// Rotas protegidas
import('./routes/servicos').then(m => app.use('/servicos', autenticar, m.default))
import('./routes/profissionais').then(m => app.use('/profissionais', autenticar, m.default))
import('./routes/agendamentos').then(m => app.use('/agendamentos', autenticar, m.default))

app.get('/', (req, res) => {
  res.json({ message: 'API saas-estetica rodando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})