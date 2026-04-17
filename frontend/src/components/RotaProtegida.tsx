import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  tipoPermitido?: string
}

function RotaProtegida({ children, tipoPermitido }: Props) {
  const token = localStorage.getItem('token')
  const usuarioStr = localStorage.getItem('usuario')

  if (!token || !usuarioStr) {
    return <Navigate to="/" replace />
  }

  if (tipoPermitido) {
    const usuario = JSON.parse(usuarioStr)
    if (usuario.tipo !== tipoPermitido) {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

export default RotaProtegida