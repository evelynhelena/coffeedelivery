import { Header } from './components/Header'
import { ShoppingCartProvider } from './hooks/useShoppingCart'
import { Home } from './pages/Home'
import './styles/global.scss'
export function App() {
  return (
    <ShoppingCartProvider>
      <Header />
      <Home />
    </ShoppingCartProvider>
  )
}
