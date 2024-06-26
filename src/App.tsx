import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShoppingCartProvider } from './hooks/useShoppingCart'
import { Home } from './pages/Home'
import './styles/global.scss'
import { Shopping } from './pages/Shopping'
import { EndPage } from './pages/EndPage'
export function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/end-page" element={<EndPage />} />
        </Routes>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}
