import '@styles/index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { store } from '@store/index'
import { Auth0ProviderWithNavigate } from '@auth/auth0-provider-with-navigate'
//import { worker } from '@mocks/browser'

const root = createRoot(document.getElementById('root') as HTMLElement)
// Initialize the msw worker, wait for the service worker registration to resolve, then mount
//if (process.env.NODE_ENV === 'development') worker.start()
// worker.start({ quiet: true }).then(() =>
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ChakraProvider> */}
      <Router>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </Router>
      {/* </ChakraProvider> */}
    </Provider>
  </React.StrictMode>,
)
// )
