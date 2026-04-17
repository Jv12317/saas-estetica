import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import AgendamentoCliente from '../pages/AgendamentoCliente'
import PainelRecepcionista from '../pages/PainelRecepcionista'
import PainelAdmin from '../pages/PainelAdmin'
import RotaProtegida from '../components/RotaProtegida'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cliente" element={
          <RotaProtegida tipoPermitido="cliente">
            <AgendamentoCliente />
          </RotaProtegida>
        } />
        <Route path="/recepcionista" element={
          <RotaProtegida tipoPermitido="recepcionista">
            <PainelRecepcionista />
          </RotaProtegida>
        } />
        <Route path="/admin" element={
          <RotaProtegida tipoPermitido="admin">
            <PainelAdmin />
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes