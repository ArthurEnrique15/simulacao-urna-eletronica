import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { LoggedUserProvider } from './contexts/LoggedUserContext'
import { CandidatesProvider } from './contexts/CandidatesContext'

export function App() {
  localStorage.clear()
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LoggedUserProvider>
          <CandidatesProvider>
            <Router />
          </CandidatesProvider>
        </LoggedUserProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
