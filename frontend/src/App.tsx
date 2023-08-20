import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { LoggedUserProvider } from './contexts/LoggedUserContext'

export function App() {
  localStorage.clear()
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LoggedUserProvider>
          <Router />
        </LoggedUserProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
