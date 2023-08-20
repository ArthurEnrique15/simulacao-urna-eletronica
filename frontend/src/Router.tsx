import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Urn } from './pages/Urn'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { useContext } from 'react'
import { LoggedUserContext } from './contexts/LoggedUserContext'

export function Router() {
  const { loggedUser } = useContext(LoggedUserContext)

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={!loggedUser ? <Navigate to="/login" /> : <Urn />}
        />
      </Route>
      <Route
        path="/login"
        element={loggedUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={loggedUser ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  )
}
