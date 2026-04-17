import bcrypt from 'bcrypt'
import pool from './database'

async function hashSenhas() {
  const senhaPlana = '123'
  const hash = await bcrypt.hash(senhaPlana, 10)

  await pool.execute('UPDATE usuarios SET senha = ? WHERE id = 1', [hash])
  await pool.execute('UPDATE usuarios SET senha = ? WHERE id = 2', [hash])
  await pool.execute('UPDATE usuarios SET senha = ? WHERE id = 3', [hash])

  console.log('Senhas atualizadas com sucesso!')
  process.exit(0)
}

hashSenhas()
