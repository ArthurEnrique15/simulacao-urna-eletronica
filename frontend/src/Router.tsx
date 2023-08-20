import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Urn } from './pages/Urn'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { useContext } from 'react'
import { LoggedUserContext } from './contexts/LoggedUserContext'
import { VotingStatus } from './pages/VotingStatus'

export function Router() {
  const { loggedUser } = useContext(LoggedUserContext)

  const getHomeElement = () => {
    if (!loggedUser) {
      return <Navigate to="/login" />
    }

    if (loggedUser.alreadyVoted) {
      return <Navigate to="/status" />
    }

    return <Urn />
  }

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={getHomeElement()} />
        <Route
          path="/status"
          element={!loggedUser ? <Navigate to="/login" /> : <VotingStatus />}
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
