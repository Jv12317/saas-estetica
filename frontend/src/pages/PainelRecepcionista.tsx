import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAgendamentos, atualizarStatusAgendamento } from '../services/api'

function PainelRecepcionista() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const navigate = useNavigate()

  const bc = { fontFamily: "'Barlow Condensed', sans-serif" }

  useEffect(() => {
    getAgendamentos().then(setAgendamentos)
  }, [])

  async function handleStatus(id: number, status: string) {
    await atualizarStatusAgendamento(id, status)
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const total = agendamentos.length
  const confirmados = agendamentos.filter(a => a.status === 'confirmado').length
  const pendentes = agendamentos.filter(a => a.status === 'pendente').length
  const profissionais = [...new Set(agendamentos.map(a => a.profissional_nome))]

  const badgeStyle = (status: string) => {
    if (status === 'confirmado') return { background: '#0f2e1a', color: '#4caf7d', border: '0.5px solid #1a4a2a' }
    if (status === 'pendente') return { background: '#1a0d0b', color: '#e63c2f', border: '0.5px solid #4a1818' }
    return { background: '#1a1a1a', color: '#555', border: '0.5px solid #2a2a2a' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: "'Inter', sans-serif", color: '#f0f0f0' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#111', borderBottom: '0.5px solid #1e1e1e', borderLeft: '3px solid #e63c2f', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...bc, fontSize: '18px', fontWeight: '800', color: '#f0f0f0', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>ESTÉTICA<span style={{ color: '#e63c2f' }}>PRO</span></div>
          <div style={{ ...bc, fontSize: '11px', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Painel do Recepcionista</div>
        </div>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); navigate('/login') }} style={{ ...bc, background: 'transparent', border: '0.5px solid #2a2a2a', borderRadius: '2px', padding: '6px 14px', fontSize: '11px', color: '#555', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          Sair
        </button>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Stats */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: '600', marginBottom: '0.75rem' }}>Resumo de hoje</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[{ num: total, label: 'Agendamentos' }, { num: confirmados, label: 'Confirmados' }, { num: pendentes, label: 'Pendentes' }].map(s => (
              <div key={s.label} style={{ background: '#111', border: '0.5px solid #1e1e1e', borderRadius: '2px', padding: '14px', textAlign: 'center' }}>
                <div style={{ ...bc, fontSize: '28px', fontWeight: '800', color: '#e63c2f' }}>{s.num}</div>
                <div style={{ ...bc, fontSize: '10px', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Por profissional */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: '600', marginBottom: '0.75rem' }}>Por profissional</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {profissionais.map(nome => {
              const lista = agendamentos.filter(a => a.profissional_nome === nome && a.status !== 'cancelado')
              const iniciais = nome.slice(0, 2).toUpperCase()
              return (
                <div key={nome} style={{ background: '#111', border: '0.5px solid #1e1e1e', borderLeft: '2px solid #e63c2f', borderRadius: '2px', padding: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '2px', background: '#e63c2f22', border: '0.5px solid #e63c2f44', display: 'flex', alignItems: 'center', justifyContent: 'center', ...bc, fontSize: '12px', fontWeight: '700', color: '#e63c2f', marginBottom: '8px' }}>{iniciais}</div>
                  <div style={{ ...bc, fontSize: '13px', fontWeight: '700', color: '#f0f0f0', textTransform: 'uppercase' as const, marginBottom: '4px' }}>{nome}</div>
                  <div style={{ ...bc, fontSize: '22px', fontWeight: '800', color: '#e63c2f' }}>{lista.length}</div>
                  <div style={{ fontSize: '10px', color: '#555' }}>atendimentos</div>
                </div>
              )
            })}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Agendamentos */}
        <div>
          <p style={{ ...bc, fontSize: '10px', color: '#e63c2f', letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: '600', marginBottom: '0.75rem' }}>Agendamentos do dia</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '450px', overflowY: 'auto', paddingRight: '8px' }}>
            {agendamentos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#555' }}>
                Nenhum agendamento
              </div>
            ) : (
              agendamentos.map(a => (
                <div key={a.id} style={{ background: '#111', border: '0.5px solid #1e1e1e', borderRadius: '2px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ ...bc, fontSize: '16px', fontWeight: '700', color: '#e63c2f', minWidth: '50px' }}>{a.horario}</div>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#f0f0f0', marginBottom: '2px' }}>{a.cliente_nome}</div>
                    <div style={{ fontSize: '11px', color: '#555' }}>{a.servico_nome} · {a.profissional_nome}</div>
                  </div>
                  {a.status === 'pendente' ? (
                    <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                      <button onClick={() => handleStatus(a.id, 'confirmado')} style={{ ...bc, background: 'transparent', border: '0.5px solid #1a4a2a', borderRadius: '2px', padding: '4px 10px', fontSize: '10px', color: '#4caf7d', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Confirmar</button>
                      <button onClick={() => handleStatus(a.id, 'cancelado')} style={{ ...bc, background: 'transparent', border: '0.5px solid #4a1818', borderRadius: '2px', padding: '4px 10px', fontSize: '10px', color: '#e63c2f', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Cancelar</button>
                    </div>
                  ) : (
                    <span style={{ ...bc, fontSize: '10px', padding: '3px 10px', borderRadius: '2px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginLeft: 'auto', ...badgeStyle(a.status) }}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PainelRecepcionista