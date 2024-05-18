import { ReactNode, createContext, useContext } from 'react'
import { productService } from '../services/product'

interface ShoppingCartProps {
  children: ReactNode
}

interface ShoppingCartData {
  getProduct: (id: number, count: number) => void
}

export const ShoppingCartContext = createContext<ShoppingCartData>(
  {} as ShoppingCartData,
)

export function ShoppingCartProvider({ children }: ShoppingCartProps) {
  const getProduct = async (id: number, count: number) => {
    const data = await productService.getPrductById(id)

    console.log(data)
    console.log(count)
  }

  return (
    <ShoppingCartContext.Provider value={{ getProduct }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  return context
}
