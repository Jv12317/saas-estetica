import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getServicos, getProfissionais, criarAgendamento } from '../services/api'
import type { Servico, Profissional } from '../types/index'

function AgendamentoCliente() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null)
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [confirmado, setConfirmado] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  useEffect(() => {
    getServicos().then(setServicos)
    getProfissionais().then(setProfissionais)
  }, [])

  async function handleConfirmar() {
    if (!servicoSelecionado || !profissionalSelecionado || !data || !horario) {
      alert('Por favor, preencha todos os campos!')
      return
    }
    setCarregando(true)
    try {
      await criarAgendamento({
        cliente_id: usuario.id,
        profissional_id: profissionalSelecionado.id,
        servico_id: servicoSelecionado.id,
        data,
        horario,
      })
      setConfirmado(true)
    } catch {
      alert('Erro ao criar agendamento. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const bc = { fontFamily: "'Barlow Condensed', sans-serif" }

  if (confirmado) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Inter', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');`}</style>
        <div style={{ background: '#111', border: '0.5px solid #1e1e1e', borderTop: '2px solid #e63c2f', borderRadius: '4px', padding: '2rem', maxWidth: '360px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', background: '#e63c2f22', border: '0.5px solid #e63c2f55', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '20px', color: '#e63c2f' }}>✓</div>
          <h2 style={{ ...bc, fontSize: '20px', fontWeight: '800', color: '#f0f0f0', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Agendamento Confirmado!</h2>
          <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>
            {servicoSelecionado?.nome} com {profissionalSelecionado?.nome}<br />{data} às {horario}
          </p>
          <button
            onClick={() => { setConfirmado(false); setServicoSelecionado(null); setProfissionalSelecionado(null); setData(''); setHorario('') }}
            style={{ ...bc, background: '#e63c2f', border: 'none', borderRadius: '2px', padding: '12px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.5rem' }}
          >
            Novo Agendamento
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: "'Inter', sans-serif", color: '#f0f0f0' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#111', borderBottom: '0.5px solid #1e1e1e', borderLeft: '3px solid #e63c2f', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...bc, fontSize: '18px', fontWeight: '800', color: '#f0f0f0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>ESTÉTICA<span style={{ color: '#e63c2f' }}>PRO</span></div>
          <div style={{ ...bc, fontSize: '11px', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Olá, {usuario.nome}!</div>
        </div>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); navigate('/login') }} style={{ ...bc, background: 'transparent', border: '0.5px solid #2a2a2a', borderRadius: '2px', padding: '6px 14px', fontSize: '11px', color: '#555', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Sair
        </button>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Serviços */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.75rem' }}>Escolha o serviço</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {servicos.map(s => (
              <div key={s.id} onClick={() => setServicoSelecionado(s)} style={{ background: servicoSelecionado?.id === s.id ? '#1a0d0b' : '#111', border: `0.5px solid ${servicoSelecionado?.id === s.id ? '#e63c2f' : '#1e1e1e'}`, borderLeft: '2px solid #e63c2f', borderRadius: '2px', padding: '12px', cursor: 'pointer' }}>
                <div style={{ ...bc, fontSize: '14px', fontWeight: '700', color: '#f0f0f0', textTransform: 'uppercase', marginBottom: '3px' }}>{s.nome}</div>
                <div style={{ fontSize: '12px', color: '#e63c2f' }}>R$ {Number(s.preco).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Profissionais */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.75rem' }}>Escolha o profissional</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {profissionais.map(p => (
              <div key={p.id} onClick={() => setProfissionalSelecionado(p)} style={{ background: profissionalSelecionado?.id === p.id ? '#1a0d0b' : '#111', border: `0.5px solid ${profissionalSelecionado?.id === p.id ? '#e63c2f' : '#1e1e1e'}`, borderRadius: '2px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '2px', background: '#e63c2f22', border: '0.5px solid #e63c2f44', display: 'flex', alignItems: 'center', justifyContent: 'center', ...bc, fontSize: '13px', fontWeight: '700', color: '#e63c2f', margin: '0 auto 8px' }}>{p.iniciais}</div>
                <div style={{ ...bc, fontSize: '12px', fontWeight: '600', color: '#f0f0f0', textTransform: 'uppercase' }}>{p.nome}</div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Data */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.75rem' }}>Escolha a data</p>
          <input type="date" value={data} onChange={e => setData(e.target.value)} style={{ background: '#111', border: '0.5px solid #2a2a2a', borderRadius: '2px', padding: '11px 14px', fontSize: '13px', color: '#f0f0f0', outline: 'none', width: '100%', fontFamily: "'Inter', sans-serif", colorScheme: 'dark' }} />
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Horários */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.75rem' }}>Escolha o horário</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {horarios.map(h => (
              <div key={h} onClick={() => setHorario(h)} style={{ background: horario === h ? '#1a0d0b' : '#111', border: `0.5px solid ${horario === h ? '#e63c2f' : '#1e1e1e'}`, borderRadius: '2px', padding: '10px 6px', fontSize: '12px', color: horario === h ? '#e63c2f' : '#555', cursor: 'pointer', textAlign: 'center' }}>{h}</div>
            ))}
          </div>
        </div>

        {/* Botão */}
        <button onClick={handleConfirmar} disabled={carregando} style={{ ...bc, background: '#e63c2f', border: 'none', borderRadius: '2px', padding: '14px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', width: '100%', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: carregando ? 0.6 : 1 }}>
          {carregando ? 'CONFIRMANDO...' : 'CONFIRMAR AGENDAMENTO'}
        </button>

      </div>
    </div>
  )
}

export default AgendamentoCliente