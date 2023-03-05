import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getConfig } from './config'

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate()
  const config = getConfig()

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(config.domain && config.clientId && config.redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        // eslint-disable-next-line camelcase
        redirect_uri: config.redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
