import { ReactNode, createContext, useContext, useState } from 'react'
import { productService } from '../services/product'

interface ShoppingCartProps {
  children: ReactNode
}

interface ShoppingCartData {
  getProduct: (id: number, count: number) => void
  status: string
  open: boolean
  handleChangeStatus: () => void
}

export const ShoppingCartContext = createContext<ShoppingCartData>(
  {} as ShoppingCartData,
)

export function ShoppingCartProvider({ children }: ShoppingCartProps) {
  const [status, setStatus] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const handleChangeStatus = () => {
    setOpen(false)
  }

  const getProduct = async (id: number, count: number) => {
    try {
      const data = await productService.getPrductById(id)
      console.log(data)
      console.log(count)
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1000)

      setStatus('SUCESS')
    } catch {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1000)
      setStatus('ERROR')
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{ getProduct, status, open, handleChangeStatus }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  return context
}
