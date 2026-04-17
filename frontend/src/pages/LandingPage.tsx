import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#0d0d0d] font-sans text-[#f0f0f0] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');
        .bc { font-family: 'Barlow Condensed', sans-serif; }
        .fade-line { opacity: 0; transform: translateY(40px); animation: fadeUp 0.6s ease forwards; }
        .fade-line:nth-child(1) { animation-delay: 0.1s; }
        .fade-line:nth-child(2) { animation-delay: 0.25s; }
        .fade-line:nth-child(3) { animation-delay: 0.4s; }
        .fade-badge { opacity: 0; transform: translateY(40px); animation: fadeUp 0.6s ease 0s forwards; }
        .fade-desc { opacity: 0; transform: translateY(40px); animation: fadeUp 0.6s ease 0.6s forwards; }
        .fade-btns { opacity: 0; transform: translateY(40px); animation: fadeUp 0.6s ease 0.8s forwards; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .grid-lines::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(90deg, transparent, transparent 60px, #ffffff04 60px, #ffffff04 61px);
          pointer-events: none;
        }
      `}</style>

      {/* Nav */}
      <nav className="bg-[#0d0d0d] border-b border-[#1e1e1e] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="bc text-xl font-black tracking-widest uppercase">ESTÉTICA<span className="text-[#e63c2f]">PRO</span></div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/login')} className="border border-[#2a2a2a] text-[#666] text-xs rounded px-4 py-2">Entrar</button>
          <button onClick={() => navigate('/login')} className="bg-[#e63c2f] text-white text-xs font-semibold rounded px-4 py-2 bc tracking-widest uppercase">Agendar</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden px-6 pt-20 pb-16 flex flex-col gap-6 grid-lines">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63c2f] to-transparent" />

        <div className="fade-badge flex items-center gap-2 bg-[#e63c2f18] border border-[#e63c2f44] rounded px-3 py-1 w-fit">
          <span className="text-[#e63c2f] text-xs bc tracking-widest uppercase">⚡ Agenda aberta agora</span>
        </div>

        <div className="overflow-hidden flex flex-col">
          <span className="fade-line bc text-5xl font-black uppercase leading-none tracking-wide">SEU CARRO</span>
          <span className="fade-line bc text-5xl font-black uppercase leading-none tracking-wide">MERECE O</span>
          <span className="fade-line bc text-5xl font-black uppercase leading-none tracking-wide text-[#e63c2f]">MELHOR</span>
        </div>

        <p className="fade-desc text-sm text-[#555] max-w-sm leading-relaxed font-light">
          Estética automotiva profissional com agendamento online. Escolha o serviço, o profissional e o horário direto pelo celular.
        </p>

        <div className="fade-btns flex gap-3 flex-wrap">
          <button onClick={() => navigate('/login')} className="bg-[#e63c2f] text-white text-xs font-semibold rounded px-6 py-3 bc tracking-widest uppercase">Agendar agora</button>
          <button className="border border-[#2a2a2a] text-[#666] text-xs rounded px-6 py-3">Ver serviços</button>
        </div>
      </div>

      <hr className="border-[#1a1a1a]" />

      {/* Serviços */}
      <div className="px-6 py-10">
        <p className="text-[#e63c2f] text-xs bc tracking-widest uppercase mb-1">O que oferecemos</p>
        <h2 className="bc text-3xl font-black uppercase tracking-wide mb-6">NOSSOS <span className="text-[#444]">SERVIÇOS</span></h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { num: '01', title: 'Polimento', desc: 'Remoção de riscos e oxidação com resultado espelhado.' },
            { num: '02', title: 'Cristalização', desc: 'Proteção e brilho duradouro para a pintura do veículo.' },
            { num: '03', title: 'Lavagem Completa', desc: 'Limpeza interna e externa com produtos profissionais.' },
            { num: '04', title: 'Higienização', desc: 'Limpeza profunda de bancos, tapetes e teto do veículo.' },
          ].map(s => (
            <div key={s.num} className="bg-[#111] border border-[#1e1e1e] border-l-2 border-l-[#e63c2f] rounded p-4">
              <div className="text-[#e63c2f] text-xs bc tracking-widest mb-1">{s.num}</div>
              <div className="bc text-sm font-bold uppercase text-[#f0f0f0] mb-1">{s.title}</div>
              <div className="text-xs text-[#444] leading-relaxed font-light">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-[#1a1a1a]" />

      {/* Diferenciais */}
      <div className="px-6 py-10">
        <p className="text-[#e63c2f] text-xs bc tracking-widest uppercase mb-1">Por que nos escolher</p>
        <h2 className="bc text-3xl font-black uppercase tracking-wide mb-6">NOSSOS <span className="text-[#444]">DIFERENCIAIS</span></h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '📱', title: 'Agendamento Online', desc: 'Agende pelo celular a qualquer hora, sem precisar ligar.' },
            { icon: '⚡', title: 'Equipe Especializada', desc: 'Profissionais treinados com produtos de alta qualidade.' },
            { icon: '🛡️', title: 'Garantia de Qualidade', desc: 'Satisfação garantida em todos os serviços realizados.' },
            { icon: '🕐', title: 'Pontualidade', desc: 'Respeitamos seu tempo com horários precisos.' },
          ].map(d => (
            <div key={d.title} className="bg-[#111] border border-[#1e1e1e] rounded p-4 flex gap-3">
              <div className="w-8 h-8 bg-[#e63c2f18] border border-[#e63c2f33] rounded flex items-center justify-center text-sm flex-shrink-0">{d.icon}</div>
              <div>
                <div className="bc text-sm font-bold uppercase text-[#f0f0f0] mb-1">{d.title}</div>
                <div className="text-xs text-[#444] leading-relaxed">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative bg-[#111] border-t border-[#1a1a1a] px-6 py-12 flex flex-col gap-4 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e63c2f] to-transparent" />
        <h2 className="bc text-4xl font-black uppercase leading-none">PRONTO PRA<br/><span className="text-[#e63c2f]">AGENDAR?</span></h2>
        <p className="text-sm text-[#444] font-light">Faça seu agendamento agora mesmo ou fale com a gente.</p>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate('/login')} className="bg-[#e63c2f] text-white text-xs font-semibold rounded px-6 py-3 bc tracking-widest uppercase">Agendar online</button>
          <a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noreferrer" className="border border-[#2a2a2a] text-[#666] text-xs rounded px-6 py-3 no-underline">Falar no WhatsApp</a>
        </div>
      </div>

    </div>
  )
}

export default LandingPage