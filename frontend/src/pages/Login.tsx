import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, registro } from '../services/api'

function Login() {
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const bc = { fontFamily: "'Barlow Condensed', sans-serif" }

  function trocarModo(novoModo: 'login' | 'registro') {
    setModo(novoModo)
    setErro('')
    setSucesso('')
    setNome('')
    setEmail('')
    setSenha('')
  }

  async function handleLogin() {
    if (!email || !senha) { setErro('Preencha todos os campos'); return }
    setCarregando(true)
    setErro('')
    try {
      const usuario = await login({ email, senha })
      if (usuario.tipo === 'cliente') navigate('/cliente')
      if (usuario.tipo === 'recepcionista') navigate('/recepcionista')
      if (usuario.tipo === 'admin') navigate('/admin')
    } catch {
      setErro('Email ou senha incorretos')
    } finally {
      setCarregando(false)
    }
  }

  async function handleRegistro() {
    if (!nome || !email || !senha) { setErro('Preencha todos os campos'); return }
    if (senha.length < 6) { setErro('A senha deve ter pelo menos 6 caracteres'); return }
    setCarregando(true)
    setErro('')
    try {
      await registro({ nome, email, senha })
      setSucesso('Cadastro realizado! Faça login para continuar.')
      trocarModo('login')
    } catch (error: any) {
      setErro(error.message || 'Erro ao cadastrar')
    } finally {
      setCarregando(false)
    }
  }

  const inputStyle = {
    background: '#0d0d0d',
    border: '0.5px solid #2a2a2a',
    borderRadius: '2px',
    padding: '11px 14px',
    fontSize: '13px',
    color: '#f0f0f0',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box' as const
  }

  const labelStyle = {
    fontSize: '10px',
    color: '#e63c2f',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    ...bc,
    fontWeight: '600'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');
        .grid-bg::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(90deg, transparent, transparent 60px, #ffffff04 60px, #ffffff04 61px);
          pointer-events: none;
        }
        .login-input:focus { border-color: #e63c2f !important; }
        .login-btn:hover { opacity: 0.9; }
        .toggle-btn:hover { color: #e63c2f !important; }
      `}</style>

      <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: '#111',
        border: '0.5px solid #1e1e1e',
        borderTop: '2px solid #e63c2f',
        borderRadius: '4px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bc, fontSize: '24px', fontWeight: '800', color: '#f0f0f0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ESTÉTICA<span style={{ color: '#e63c2f' }}>PRO</span>
          </div>
          <div style={{ ...bc, fontSize: '11px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
            {modo === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '0.5px solid #1e1e1e' }} />

        {/* Campos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {modo === 'registro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Nome</label>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="login-input"
                style={inputStyle}
              />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="login-input"
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="login-input"
              style={inputStyle}
            />
          </div>
        </div>

        {erro && <p style={{ color: '#e63c2f', fontSize: '12px', textAlign: 'center', margin: 0 }}>{erro}</p>}
        {sucesso && <p style={{ color: '#4caf7d', fontSize: '12px', textAlign: 'center', margin: 0 }}>{sucesso}</p>}

        <button
          onClick={modo === 'login' ? handleLogin : handleRegistro}
          disabled={carregando}
          className="login-btn"
          style={{
            background: '#e63c2f',
            border: 'none',
            borderRadius: '2px',
            padding: '12px',
            ...bc,
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            width: '100%',
            transition: 'opacity 0.2s',
            opacity: carregando ? 0.6 : 1
          }}
        >
          {carregando
            ? (modo === 'login' ? 'ENTRANDO...' : 'CADASTRANDO...')
            : (modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA')}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#555', margin: 0, ...bc, letterSpacing: '0.05em' }}>
          {modo === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
          <span
            onClick={() => trocarModo(modo === 'login' ? 'registro' : 'login')}
            className="toggle-btn"
            style={{ color: '#888', cursor: 'pointer', transition: 'color 0.2s', textDecoration: 'underline' }}
          >
            {modo === 'login' ? 'Cadastre-se' : 'Faça login'}
          </span>
        </p>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#333', ...bc, letterSpacing: '0.05em', margin: 0 }}>
          EstéticaPro © 2026
        </p>

      </div>
    </div>
  )
}

export default Login