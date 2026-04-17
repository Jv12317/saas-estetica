import { Router, Request, Response } from 'express'
import pool from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body

  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou senha incorretos' })
    }

    const usuario = rows[0]

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha incorretos' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    )

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    })

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

router.post('/registro', async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body

  try {
    const [existe]: any = await pool.execute(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    )

    if (existe.length > 0) {
      return res.status(409).json({ message: 'Email já cadastrado' })
    }

    const hash = await bcrypt.hash(senha, 10)

    await pool.execute(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, hash, 'cliente']
    )

    return res.status(201).json({ message: 'Cadastro realizado com sucesso!' })

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

export default router