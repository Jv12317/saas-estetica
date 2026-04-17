import { Router, Request, Response } from 'express'
import pool from '../database'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.execute('SELECT * FROM servicos')
    return res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

export default router