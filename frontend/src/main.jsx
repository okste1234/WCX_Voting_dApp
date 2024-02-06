import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { config } from './config/wagmiConfig.js'
import { WagmiProvider } from "wagmi"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </QueryClientProvider>
  </WagmiProvider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
