import '@styles/index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from '@store/index'
import { Auth0ProviderWithNavigate } from '@auth/auth0-provider-with-navigate'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </Router>
    </Provider>
  </React.StrictMode>,
)
