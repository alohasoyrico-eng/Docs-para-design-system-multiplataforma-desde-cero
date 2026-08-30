import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale="es" defaultLocale="es">
      <RouterProvider router={router} />
    </IntlProvider>
  </StrictMode>,
)
