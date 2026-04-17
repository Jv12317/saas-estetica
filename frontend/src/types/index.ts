export interface Usuario {
  id: number
  nome: string
  email: string
  tipo: 'cliente' | 'recepcionista' | 'admin'
}

export interface LoginResponse {
  id: number
  nome: string
  email: string
  tipo: 'cliente' | 'recepcionista' | 'admin'
}

export interface LoginData {
  email: string
  senha: string
}

export interface Servico {
  id: number
  nome: string
  preco: number
  duracao_min: number
}

export interface Profissional {
  id: number
  nome: string
  iniciais: string
  salario: number
  folga: string
}

export interface Agendamento {
  id: number
  cliente_id: number
  profissional_id: number
  servico_id: number
  data: string
  horario: string
  status: 'pendente' | 'confirmado' | 'cancelado'
}