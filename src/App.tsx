import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ClientLogin from './pages/ClientLogin'
import Room from './pages/Room'
import ClientGenerate from './pages/ClientGenerate'
import ClientDomains from './pages/ClientDomains'
import ClientDomainForm from './pages/ClientDomainForm'
import AdminLayout from './pages/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import UserForm from './pages/UserForm'
import AdminLicenses from './pages/AdminLicenses'
import LicenseForm from './pages/LicenseForm'
import AdminDomains from './pages/AdminDomains'
import DomainForm from './pages/DomainForm'
import PublicInbox from './pages/PublicInbox'

function App() {
  return (
    <Routes>
      <Route path="/inbox" element={<PublicInbox />} />
      <Route path="/login" element={<Login />} />
      <Route path="/access" element={<ClientLogin />} />
      <Route path="/room" element={<Room />}>
        <Route index element={<ClientGenerate />} />
        <Route path="domains" element={<ClientDomains />} />
        <Route path="domains/create" element={<ClientDomainForm />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/create" element={<UserForm />} />
        <Route path="users/:id/edit" element={<UserForm />} />
        <Route path="licenses" element={<AdminLicenses />} />
        <Route path="licenses/create" element={<LicenseForm />} />
        <Route path="domains" element={<AdminDomains />} />
        <Route path="domains/create" element={<DomainForm />} />
        <Route path="domains/:id/edit" element={<DomainForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
