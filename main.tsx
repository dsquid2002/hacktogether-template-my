import { StrictMode } from 'react'
import { Button } from 'primereact/button';
import { createRoot } from 'react-dom/client'
import { ReactTogether } from 'react-together'

import App from '@./App';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
)
