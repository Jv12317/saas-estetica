import { Router, Request, Response } from 'express'
import pool from '../database'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.execute(`
      SELECT a.*, 
        u.nome as cliente_nome,
        p.nome as profissional_nome,
        s.nome as servico_nome,
        s.preco as servico_preco
      FROM agendamentos a
      JOIN usuarios u ON a.cliente_id = u.id
      JOIN profissionais p ON a.profissional_id = p.id
      JOIN servicos s ON a.servico_id = s.id
      ORDER BY a.data, a.horario
    `)
    return res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { cliente_id, profissional_id, servico_id, data, horario } = req.body

  try {
    const [result]: any = await pool.execute(
      'INSERT INTO agendamentos (cliente_id, profissional_id, servico_id, data, horario) VALUES (?, ?, ?, ?, ?)',
      [cliente_id, profissional_id, servico_id, data, horario]
    )
    return res.json({ message: 'Agendamento criado com sucesso!', id: result.insertId })
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

router.patch('/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  try {
    await pool.execute(
      'UPDATE agendamentos SET status = ? WHERE id = ?',
      [status, id]
    )
    return res.json({ message: 'Status atualizado!' })
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

export default router