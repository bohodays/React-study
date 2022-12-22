import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContainer from './AppContainer'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
)