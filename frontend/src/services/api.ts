import type { LoginData, LoginResponse, Servico, Profissional, Agendamento } from '../types/index'

const API_URL = 'http://localhost:3000'

function getToken() {
  return localStorage.getItem('token')
}

function authHeader() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Email ou senha incorretos')

  const resultado = await response.json()
  localStorage.setItem('token', resultado.token)
  localStorage.setItem('usuario', JSON.stringify(resultado.usuario))

  return resultado.usuario
}

export async function getServicos(): Promise<Servico[]> {
  const response = await fetch(`${API_URL}/servicos`, {
    headers: authHeader()
  })
  if (!response.ok) throw new Error('Erro ao buscar serviços')
  return response.json()
}

export async function getProfissionais(): Promise<Profissional[]> {
  const response = await fetch(`${API_URL}/profissionais`, {
    headers: authHeader()
  })
  if (!response.ok) throw new Error('Erro ao buscar profissionais')
  return response.json()
}

export async function criarAgendamento(data: Omit<Agendamento, 'id' | 'status'>): Promise<{ message: string, id: number }> {
  const response = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Erro ao criar agendamento')
  return response.json()
}

export async function getAgendamentos(): Promise<any[]> {
  const response = await fetch(`${API_URL}/agendamentos`, {
    headers: authHeader()
  })
  if (!response.ok) throw new Error('Erro ao buscar agendamentos')
  return response.json()
}

export async function atualizarStatusAgendamento(id: number, status: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/agendamentos/${id}/status`, {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify({ status }),
  })

  if (!response.ok) throw new Error('Erro ao atualizar status')
  return response.json()
}

export async function registro(data: { nome: string, email: string, senha: string }): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const erro = await response.json()
    throw new Error(erro.message)
  }

  return response.json()
}
