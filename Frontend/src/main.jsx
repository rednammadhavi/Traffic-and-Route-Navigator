import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { socket } from './socket'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App socket={socket} />
  </StrictMode>,
)
